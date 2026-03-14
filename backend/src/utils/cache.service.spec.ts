import { Cache } from "cache-manager";
import { CacheService } from "./cache.service";
import { Test, TestingModule } from "@nestjs/testing";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  mockReconcileRequestDto,
  mockReconcileResponseDto,
} from "../common/mocks/reconcile.mock";
import {
  ReconcileMedicationRequestDto,
  type ReconcileMedicationResponseDto,
} from "../modules/reconcile/dto/reconcile-medication.dto";

// mocking the managers functions
const mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
};

describe("CacheService", () => {
  // instantiating the service prior to running the test
  let service: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  // this test shows that if a duplicate req is made the keys will be identical so if in cache it can be found
  it("should generate consistent cache keys for the same input", () => {
    const dto: ReconcileMedicationRequestDto = mockReconcileRequestDto;
    const key1 = service.generateCacheKey("reconcile", dto);
    const key2 = service.generateCacheKey("reconcile", dto);

    expect(key1).toEqual(key2);
  });

  // this ensures that the value is being stored in cache
  it("should call cache.set when storing a value", async () => {
    const key = "test-key";
    const value: ReconcileMedicationResponseDto = mockReconcileResponseDto;
    mockCacheManager.set.mockResolvedValue(undefined);

    await service.set(key, value);

    expect(mockCacheManager.set).toHaveBeenCalledWith(key, value);
  });

  // this validates that the data we store is the same data we get back when retrieving with the key
  it("should call cache.get and return the stored value", async () => {
    const key = "test-key";
    const value = { hello: "world" };
    mockCacheManager.get.mockResolvedValue(value);

    const result = await service.get(key);

    expect(mockCacheManager.get).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });

  // this ensures that so long as the prefixes are different the keys will be unique e.g. service keys do not overlap
  it("should generate different keys for different prefixes despite same input", () => {
    const dto = mockReconcileRequestDto;

    const keyValidate = service.generateCacheKey("validate", dto);
    const keyReconcile = service.generateCacheKey("reconcile", dto);

    expect(keyValidate).not.toEqual(keyReconcile);
  });
});
