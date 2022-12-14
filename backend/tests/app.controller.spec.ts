import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "../src/app.controller";
import { AppService } from "../src/app.service";
import { TokenService } from "../src/services/token.service";
import { GuessGuard } from "../src/guards/GuessGuard";
import { DatabaseService } from "../src/services/database.service";
import { DbTestingModule } from "./helpers/dbTesting.module";
import { INestApplication } from "@nestjs/common";

describe("AppController", () => {
  let appController: AppController;
  let module: TestingModule;
  let app: INestApplication;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [...DbTestingModule()],
      controllers: [AppController],
      providers: [DatabaseService, TokenService, AppService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    appController = module.get<AppController>(AppController);
  });

  afterAll(async () => {
    await app.close();
  });

  describe("app controller tests", () => {
    it("should ensure the GuessGuard is applied to the addGuess method", async () => {
      const guards = Reflect.getMetadata(
        "__guards__",
        AppController.prototype.addGuess
      );
      const guard = new guards[0]();
      expect(guard).toBeInstanceOf(GuessGuard);
    });

    it("should assert valid tokenData request", async () => {
      expect(await appController.getTokenData()).not.toBeNaN();
    });

    it("should assert valid getPlayer request", async () => {
      const identifier = "abc-123";
      expect(await appController.getPlayer(identifier)).not.toBeNaN();
    });

    it("should assert valid addPlayer request", async () => {
      const identifier = "abc-123";
      expect(await appController.addPlayer(identifier)).not.toBeNaN();
    });

    it("should assert valid addGuess request", async () => {
      expect(await appController.addGuess(1, 1, 15000)).resolves;
    });
  });
});
