import { GoogleGenAI } from "@google/genai";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GeminiService {
  // immutable const so we keep it strictly in this file and unchangable
  private readonly ai = new GoogleGenAI({});

  // instanciate the ai const and set the api key to the env api key
  constructor(private readonly configService: ConfigService) {
    this.ai = new GoogleGenAI({
      apiKey: this.configService.getOrThrow("GEMINI_API_KEY"),
    });
  }

  // accepts a prompt and returns strictly json
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

    // passes the string res from gemini to get back the json as string
    const jsonString = this.extractJson(text);

    try {
      return JSON.parse(jsonString) as Record<string, unknown>;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException("Gemini returned Invalid JSON");
    }
  }

  // accepts the string res from gemini to return the json string
  private extractJson(text?: string): string {
    // ensuring the text isnt empty
    if (!text || !text.trim()) {
      Logger.error("Gemini returned empty response");
      throw new InternalServerErrorException("Gemini returned empty response");
    }

    // clears leading and trailing whitespace
    const trimmed = text.trim();

    // removing gemini generated wrappers
    const unfenced = trimmed
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    // locating the start and end json bracets
    const start = unfenced.indexOf("{");
    const end = unfenced.lastIndexOf("}");

    // ensuring the start and end bracket positions make sense
    if (start === -1 || end === -1 || end <= start) {
      throw new InternalServerErrorException(
        "No JSON object found in model output",
      );
    }

    // returning the string json
    return unfenced.slice(start, end + 1);
  }
}
