import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateModificadorDto {
  @IsOptional()
  @IsInt()
  idModificador?: number;

  @IsOptional()
  @IsString()
  nombre?: string;
}

export class CreateCondimentoDto {
  @IsOptional()
  @IsInt()
  idCondimento?: number;

  @IsOptional()
  @IsString()
  comentario?: string;

  @IsOptional()
  @IsString()
  nombre?: string;
}

export class CreateProductoDto {
  @IsOptional()
  @IsInt()
  idDetalleOrden?: number;

  @IsOptional()
  @IsInt()
  idProducto?: number;

  @IsOptional()
  @IsInt()
  cantidad?: number;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  comentario?: string;

  @IsOptional()
  @IsInt()
  comanda?: number;

  @IsOptional()
  @IsString()
  fechaUltimoRegistro?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateModificadorDto)
  modificadores?: CreateModificadorDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCondimentoDto)
  condimentos?: CreateCondimentoDto[];
}

export class CreatePruebaOrdenDto {
  @IsOptional()
  @IsInt()
  numeroOrden?: number;

  @IsOptional()
  @IsInt()
  numeroMesa?: number;

  @IsOptional()
  @IsInt()
  numeroComanda?: number;

  @IsOptional()
  @IsString()
  mesero?: string;

  @IsOptional()
  @IsString()
  horaRegistrada?: string;

  @IsOptional()
  @IsInt()
  tipoOrden?: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductoDto)
  productos: CreateProductoDto[];

  @IsOptional()
  @IsString()
  referenciaOrden?: string;

  @IsOptional()
  @IsString()
  proveedor?: string;

  @IsOptional()
  @IsString()
  tiempoTranscurrido?: string;
}

export class UpdatePruebaOrdenDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsInt()
  numeroOrden?: number;

  @IsOptional()
  @IsInt()
  numeroMesa?: number;

  @IsOptional()
  @IsInt()
  numeroComanda?: number;

  @IsOptional()
  @IsString()
  mesero?: string;

  @IsOptional()
  @IsString()
  horaRegistrada?: string;

  @IsOptional()
  @IsInt()
  tipoOrden?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductoDto)
  productos?: CreateProductoDto[];

  @IsOptional()
  @IsString()
  referenciaOrden?: string;

  @IsOptional()
  @IsString()
  proveedor?: string;

  @IsOptional()
  @IsString()
  tiempoTranscurrido?: string;
}
