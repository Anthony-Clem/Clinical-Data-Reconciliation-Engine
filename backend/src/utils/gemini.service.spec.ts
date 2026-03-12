import { Test, TestingModule } from "@nestjs/testing";
import { GeminiService } from "./gemini.service";
import { InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

const mockGenerateContent = jest.fn();

jest.mock("@google/genai", () => {
  return {
    GoogleGenAI: jest.fn().mockImplementation(() => ({
      models: {
        generateContent: mockGenerateContent,
      },
    })),
  };
});

describe("GeminiService", () => {
  let service: GeminiService;

  const mockConfigService = {
    getOrThrow: jest.fn().mockReturnValue("fake-api-key"),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeminiService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<GeminiService>(GeminiService);
    mockGenerateContent.mockReset();
  });

  it("should return parsed JSON when API returns text", async () => {
    const prompt = "test prompt";
    const mockResponse = { text: '{"foo":"bar"}' };

    mockGenerateContent.mockResolvedValue(mockResponse);

    const result = await service.generateContent(prompt);

    expect(mockGenerateContent).toHaveBeenCalledWith({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });
    expect(result).toEqual({ foo: "bar" });
  });

  it("should throw InternalServerErrorException if API returns no text", async () => {
    const prompt = "test prompt";
    mockGenerateContent.mockResolvedValue({ text: null });

    await expect(service.generateContent(prompt)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
  });
});
