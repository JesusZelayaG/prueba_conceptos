import { Test, TestingModule } from '@nestjs/testing';
import { PruebaOrdenService } from './prueba-orden.service';

describe('PruebaOrdenService', () => {
  let service: PruebaOrdenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PruebaOrdenService],
    }).compile();

    service = module.get<PruebaOrdenService>(PruebaOrdenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
