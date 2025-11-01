import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PruebaOrdenService } from './prueba-orden.service';
import { CreatePruebaOrdenDto } from './dtos/prueba-orden.dto';

@Controller('prueba-orden')
export class PruebaOrdenController {
  constructor(private readonly pruebaOrdenService: PruebaOrdenService) {}

  @Get()
  async obtenerPruebaOrdenes() {
    return await this.pruebaOrdenService.obtenerPruebaOrdenes();
  }

  @Get(':id')
  async obtenerPruebaOrdenPorId(@Param('id') id: string) {
    return await this.pruebaOrdenService.obtenerPruebaOrdenPorId(id);
  }

  @Post()
  async crearPruebaOrden(@Body() body: CreatePruebaOrdenDto) {
    return await this.pruebaOrdenService.crearPruebaOrden(body);
  }

  @Delete(':id')
  async eliminarPruebaOrden(@Param('id') id: string) {
    return await this.pruebaOrdenService.eliminarPruebaOrden(id);
  }
}
