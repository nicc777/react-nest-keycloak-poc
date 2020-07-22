import { Test, TestingModule } from '@nestjs/testing';
import { FortuneService } from './fortune.service';

describe('FortuneService', () => {
  let service: FortuneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FortuneService],
    }).compile();

    service = module.get<FortuneService>(FortuneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
