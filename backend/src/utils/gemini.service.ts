import { GoogleGenAI } from "@google/genai";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GeminiService {
  private readonly ai = new GoogleGenAI({});

  constructor(private readonly configService: ConfigService) {
    this.ai = new GoogleGenAI({
      apiKey: this.configService.getOrThrow("GEMINI_API_KEY"),
    });
  }

  async generateContent(prompt: string): Promise<Record<string, unknown>> {
    const res = await this.ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = res.text;

    const jsonString = this.extractJson(text);

    try {
      return JSON.parse(jsonString) as Record<string, unknown>;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException("Gemini returned Invalid JSON");
    }
  }

  private extractJson(text?: string): string {
    if (!text || !text.trim()) {
      Logger.error("Gemini returned empty response");
      throw new InternalServerErrorException("Gemini returned empty response");
    }

    const trimmed = text.trim();

    const unfenced = trimmed
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    const start = unfenced.indexOf("{");
    const end = unfenced.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("No JSON object found in model output");
    }

    return unfenced.slice(start, end + 1);
  }
}
