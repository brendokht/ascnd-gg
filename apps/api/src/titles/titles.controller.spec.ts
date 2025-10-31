import { Test, TestingModule } from "@nestjs/testing";
import { TitlesController } from "./titles.controller";

describe("TitleController", () => {
  let controller: TitlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TitlesController],
    }).compile();

    controller = module.get<TitlesController>(TitlesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
