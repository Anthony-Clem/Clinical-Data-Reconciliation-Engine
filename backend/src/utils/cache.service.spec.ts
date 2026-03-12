import { Cache } from "cache-manager";
import { CacheService } from "./cache.service";
import { Test, TestingModule } from "@nestjs/testing";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  mockReconcileRequestDto,
  mockReconcileResponseDto,
} from "@/common/mocks/reconcile.mock";

const mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
};

describe("CacheService", () => {
  let service: CacheService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let cache: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cache = module.get<Cache>(CACHE_MANAGER);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should generate consistent cache keys for the same input", () => {
    const dto = mockReconcileRequestDto;
    const key1 = service.generateCacheKey("reconcile", dto);
    const key2 = service.generateCacheKey("reconcile", dto);

    expect(key1).toEqual(key2);
  });

  it("should call cache.set when storing a value", async () => {
    const key = "test-key";
    const value = mockReconcileResponseDto;
    mockCacheManager.set.mockResolvedValue(undefined);

    await service.set(key, value);

    expect(mockCacheManager.set).toHaveBeenCalledWith(key, value);
  });

  it("should call cache.get and return the stored value", async () => {
    const key = "test-key";
    const value = { hello: "world" };
    mockCacheManager.get.mockResolvedValue(value);

    const result = await service.get(key);

    expect(mockCacheManager.get).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });

  it("should generate different keys for different prefixes despite same input", () => {
    const dto = mockReconcileRequestDto;

    const keyValidate = service.generateCacheKey("validate", dto);
    const keyReconcile = service.generateCacheKey("reconcile", dto);

    expect(keyValidate).not.toEqual(keyReconcile);
  });
});
