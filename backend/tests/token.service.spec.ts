import { Test, TestingModule } from "@nestjs/testing";
import { TokenService } from "../src/services/token.service";

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
