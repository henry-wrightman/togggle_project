import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseService } from "../src/services/database.service";
import { DbTestingModule } from "./helpers/dbTesting.module";
import { initTestDataset } from "./helpers/dbTestDataset";
import { PlayerEntity, GuessEntity } from "../src/entities";

describe("ApiService", () => {
  let db: DatabaseService;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [...DbTestingModule()],
      providers: [DatabaseService],
    }).compile();

    db = module.get<DatabaseService>(DatabaseService);
    await initTestDataset();
  });

  afterAll(async () => {
    await module.close();
  });

  describe("test player methods", () => {
    it("assert undefined getPlayer by null id", async () => {
      const identifier = undefined;
      const player: PlayerEntity = await db.getPlayer(identifier);
      expect(player).toBe(undefined);
    });

    it("assert getPlayer by id", async () => {
      const identifier = "abc-123";
      const player: PlayerEntity = await db.getPlayer(identifier);
      expect(player.identifier).toBe(identifier);
      expect(player.score).not.toBeNaN();
    });

    it("assert undefined addPlayer by null id", async () => {
      const identifier = undefined;
      const player: PlayerEntity = await db.addPlayer(identifier);
      expect(player).toBe(undefined);
    });

    it("assert addPlayer by identifier", async () => {
      const identifier = "abc-456";
      const player: PlayerEntity = await db.addPlayer(identifier);
      expect(player.identifier).toBe(identifier);
      expect(player.score).not.toBeNaN();
    });

    it("assert addPlayer by identifier already exists returns existing player", async () => {
      const identifier = "abc-123";
      const player: PlayerEntity = await db.addPlayer(identifier);
      expect(player.identifier).toBe(identifier);
    });
  });

  describe("test guess methods", () => {
    it("assert undefined addGuess with null parameter", async () => {
      const guess: GuessEntity = await db.addGuess(null, null);
      expect(guess).toBe(undefined);
    });

    it("assert addGuess successful", async () => {
      const guess: GuessEntity = await db.addGuess(1, 1);
      expect(guess).not.toBeNaN();
    });

    it("assert undefined updateGuess with null params", async () => {
      const result = await db.updateGuess(null, null, 30000, null, true);
      expect(result).toBe(undefined);
    });

    it("assert updateGuess successful", async () => {
      const identifier = "abc-123";
      await expect(db.updateGuess(1, 1, 30000, 40000, true)).resolves;
    });

    it("assert false hasCurrentGuess by null playerId", async () => {
      const exists = await db.hasCurrentGuess(undefined);
      expect(exists).toBe(false);
    });

    it("assert hasCurrentGuess by playerId", async () => {
      const exists = await db.hasCurrentGuess(1);
      expect(exists).toBe(true);
    });

    it("assert hasCurrentGuess by playerId is false", async () => {
      const exists = await db.hasCurrentGuess(3);
      expect(exists).toBe(false);
    });
  });

  describe("test score methods", () => {
    it("assert updateScore by playerId", async () => {
      const identifier = "abc-123";
      let player: PlayerEntity = await db.getPlayer(identifier);
      const currentScore = player.score.value;

      await db.updateScore(player.id, 1);
      player = await db.getPlayer(identifier);
      expect(player.score.value).toBe(currentScore + 1);
    });
  });
});
