"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
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
import { ValidateDataQualitySchema } from "@/lib/schemas";
import {
  ValidateDataQualityFormattedResponse,
  ValidateDataQualityResponse,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ValidateDataQualityDialog from "./validate-data-quality-dialog";

const ValidateDataQualityForm = () => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<ValidateDataQualityResponse | null>(
    null,
  );

  const { isPending, mutate } = useMutation({
    mutationFn: (payload: ValidateDataQualityFormattedResponse) =>
      api.post("/validate/data-quality", payload),
    onSuccess: (data: AxiosResponse<ValidateDataQualityResponse>) => {
      setResult(data.data);
      setOpen(true);
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error("Error validating data quality");
    },
  });

  const form = useForm<z.infer<typeof ValidateDataQualitySchema>>({
    resolver: zodResolver(ValidateDataQualitySchema, undefined, { raw: true }),
    defaultValues: {
      demographics: {
        name: "",
        dob: "",
        gender: undefined,
      },
      medications: "",
      allergies: "",
      conditions: "",
      vital_signs: {
        blood_pressure: "",
        heart_rate: "",
      },
      last_updated: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ValidateDataQualitySchema>) => {
    const payload = {
      demographics: {
        ...data.demographics,
        dob: data.demographics.dob,
      },
      medications: data.medications.split(",").map((m) => m.trim()),
      allergies: data.allergies
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a.length > 0),
      conditions: data.conditions.split(",").map((c) => c.trim()),
      vital_signs: data.vital_signs,
      last_updated: data.last_updated,
    };
    console.log(payload);

    mutate(payload);
  };

  return (
    <>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Controller
              name="demographics.name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...field} placeholder="John Doe" />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />

            <Controller
              name="demographics.dob"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Date of Birth</FieldLabel>
                  <Input {...field} type="date" />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />

            <Controller
              name="demographics.gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Gender</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />
          </FieldGroup>

          <Controller
            name="medications"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Medications</FieldLabel>
                <Input
                  {...field}
                  placeholder="Metformin 500mg, Lisinopril 10mg"
                />
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : []}
                />
              </Field>
            )}
          />

          <Controller
            name="allergies"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Allergies</FieldLabel>
                <Input {...field} placeholder="Penicillin, Sulfa" />
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
                <FieldLabel>Conditions</FieldLabel>
                <Input {...field} placeholder="Type 2 Diabetes, Hypertension" />
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : []}
                />
              </Field>
            )}
          />

          <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="vital_signs.blood_pressure"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Blood Pressure</FieldLabel>
                  <Input {...field} placeholder="120/80" />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />

            <Controller
              name="vital_signs.heart_rate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Heart Rate</FieldLabel>
                  <Input {...field} placeholder="72" />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />
          </FieldGroup>

          <Controller
            name="last_updated"
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
        </form>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
          {!isPending ? (
            "Validate"
          ) : (
            <HugeiconsIcon icon={Spinner} className="animate-spin" />
          )}
        </Button>
      </CardFooter>
      <ValidateDataQualityDialog
        open={open}
        setOpen={setOpen}
        result={result}
      />
    </>
  );
};

export default ValidateDataQualityForm;
