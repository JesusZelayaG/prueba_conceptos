import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateOrdenDto, UpdateOrdenDto } from '../dtos/orden.dto';
import { OrdenesService } from '../services/ordenes.service';

@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}
  @Get()
  async obtenerOrdenes() {
    return await this.ordenesService.obtenerOrdenes();
  }

  @Get('ultima')
  async obtenerUltimaOrden() {
    return await this.ordenesService.obtenerUltimaOrden();
  }

  @Get(':id')
  async obtenerOrdenPorId(@Param('id') id: string) {
    return await this.ordenesService.obtenerOrdenPorId(id);
  }

  @Post()
  async crearOrden(@Body() body: CreateOrdenDto) {
    return await this.ordenesService.crearOrden(body);
  }

  @Put()
  async actualizarOrden(@Body() body: UpdateOrdenDto) {
    return await this.ordenesService.actualizarOrden(body);
  }

  @Delete(':id')
  async eliminarOrden(@Param('id') id: string) {
    return await this.ordenesService.eliminarOrden(id);
  }
  //Estudiar y agregar elementos de validacion y estatuscode
}
