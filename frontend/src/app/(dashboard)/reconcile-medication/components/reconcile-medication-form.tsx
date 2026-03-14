"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/axios";
import { ReconcileMedicationSchema } from "@/lib/schemas";
import {
  ReconcileMedicationFormattedPayload,
  ReconcileMedicationResponse,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner, Trash } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ReconcileMedicationDialog from "./reconcile-medication-dialog";

const ReconcileMedicationForm = () => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<ReconcileMedicationResponse | null>(
    null,
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ReconcileMedicationFormattedPayload) =>
      api.post("/reconcile/medication", payload),
    onSuccess: (data: AxiosResponse<ReconcileMedicationResponse>) => {
      setResult(data.data);
      setOpen(true);
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error("Error reconciling medication");
    },
  });

  const form = useForm<z.infer<typeof ReconcileMedicationSchema>>({
    resolver: zodResolver(ReconcileMedicationSchema, undefined, { raw: true }),
    defaultValues: {
      age: undefined,
      conditions: "",
      recentLabs: "",
      sources: [
        {
          system: "",
          medication: "",
          last_updated: "",
          source_reliability: "high",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sources",
  });

  const parseLabs = (text: string) => {
    const labs: Record<string, number> = {};
    text.split(",").forEach((pair) => {
      const [key, value] = pair.split(":").map((s) => s.trim());
      if (key && value) labs[key] = Number(value);
    });
    return labs;
  };

  const onSubmit = (data: z.infer<typeof ReconcileMedicationSchema>) => {
    const payload = {
      patient_context: {
        age: data.age,
        conditions: data.conditions.split(",").map((c) => c.trim()),
        recent_labs: parseLabs(data.recentLabs),
      },
      sources: data.sources,
    };
    mutate(payload);
  };
  return (
    <>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="age"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Age</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />

            <Controller
              name="conditions"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="conditions">Conditions</FieldLabel>
                  <Input
                    {...field}
                    id="conditions"
                    placeholder="Type 2 Diabetes, Hypertension"
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />
          </FieldGroup>

          <Controller
            name="recentLabs"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="recentLabs">Recent Labs</FieldLabel>
                <Input
                  {...field}
                  id="recentLabs"
                  placeholder="eGFR: 45, HbA1c: 7.2"
                />
                <FieldDescription>
                  Enter lab results as key-value pairs separated by commas.
                </FieldDescription>
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : []}
                />
              </Field>
            )}
          />

          <div className="space-y-4">
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="p-4 border rounded-md bg-white space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Source {index + 1}</h4>

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 px-2 text-xs"
                    >
                      <HugeiconsIcon icon={Trash} />
                    </Button>
                  )}
                </div>

                <Controller
                  name={`sources.${index}.system`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>System</FieldLabel>
                      <Input {...field} />
                      <FieldError
                        errors={fieldState.error ? [fieldState.error] : []}
                      />
                    </Field>
                  )}
                />

                <Controller
                  name={`sources.${index}.medication`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Medication</FieldLabel>
                      <Input {...field} />
                      <FieldError
                        errors={fieldState.error ? [fieldState.error] : []}
                      />
                    </Field>
                  )}
                />

                <Controller
                  name={`sources.${index}.last_updated`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Last Updated</FieldLabel>
                      <Input {...field} type="date" />
                      <FieldError
                        errors={fieldState.error ? [fieldState.error] : []}
                      />
                    </Field>
                  )}
                />

                <Controller
                  name={`sources.${index}.source_reliability`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Source Reliability</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select reliability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldError
                        errors={fieldState.error ? [fieldState.error] : []}
                      />
                    </Field>
                  )}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  system: "",
                  medication: "",
                  last_updated: "",
                  source_reliability: "high",
                })
              }
            >
              + Add Source
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
          {!isPending ? (
            "Reconcile"
          ) : (
            <HugeiconsIcon icon={Spinner} className="animate-spin" />
          )}
        </Button>
      </CardFooter>
      <ReconcileMedicationDialog
        open={open}
        setOpen={setOpen}
        result={result}
      />
    </>
  );
};

export default ReconcileMedicationForm;
