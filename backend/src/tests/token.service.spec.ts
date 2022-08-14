import { Test, TestingModule } from "@nestjs/testing";
import { TokenService } from "../services/token.service";
import { TokenDataResponse } from "../types";

describe("TokenService", () => {
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService],
    }).compile();

    const app = module.createNestApplication();
    await app.init();
    tokenService = app.get<TokenService>(TokenService);
  });

  describe("test tokenData result", () => {
    it("standard request", async () => {
      await expect(await tokenService.getTokenData()).resolves;
    });
  });
});
