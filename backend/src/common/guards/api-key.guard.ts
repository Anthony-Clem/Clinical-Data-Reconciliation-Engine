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
    const request = context.switchToHttp().getRequest<Request>();

    const header = request.headers["x-api-key"];

    const incomingKey = Array.isArray(header) ? header[0] : header;

    if (
      !incomingKey ||
      typeof incomingKey !== "string" ||
      !incomingKey.trim()
    ) {
      throw new UnauthorizedException("No API key provided");
    }

    const apikey = this.config.getOrThrow<string>("API_KEY");

    if (incomingKey !== apikey) {
      throw new UnauthorizedException("Invalid API Key");
    }

    return true;
  }
}
