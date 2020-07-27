import { Test, TestingModule } from '@nestjs/testing';
import { FortuneController } from './fortune.controller';

describe('Fortune Controller', () => {
  let controller: FortuneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FortuneController],
    }).compile();

    controller = module.get<FortuneController>(FortuneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
