import { Test, TestingModule } from '@nestjs/testing';
import { PruebaOrdenController } from './prueba-orden.controller';

describe('PruebaOrdenController', () => {
  let controller: PruebaOrdenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PruebaOrdenController],
    }).compile();

    controller = module.get<PruebaOrdenController>(PruebaOrdenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
