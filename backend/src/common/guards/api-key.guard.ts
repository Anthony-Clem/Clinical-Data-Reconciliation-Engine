import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    // intercepting the request
    const request = context.switchToHttp().getRequest<Request>();

    // extracting the header containing the api key
    const header = request.headers["x-api-key"];

    // extracting the incoming key from the header
    const incomingKey = Array.isArray(header) ? header[0] : header;

    // checking if the checking if the incoming key extracted is empty or an invalid type
    if (
      !incomingKey ||
      typeof incomingKey !== "string" ||
      !incomingKey.trim()
    ) {
      throw new UnauthorizedException("No API key provided");
    }

    // retrieving the api key from environment variable
    const apikey = this.config.getOrThrow<string>("API_KEY");

    // checking if the incoming key matches the api key
    if (incomingKey !== apikey) {
      throw new UnauthorizedException("Invalid API Key");
    }

    // allowing access if all checks passed
    return true;
  }
}
