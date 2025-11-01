import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateOrdenDto {
  @IsString()
  @IsNotEmpty()
  cliente: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsNotEmpty()
  cantidadItems: number;
}

export class UpdateOrdenDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  cliente: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsNotEmpty()
  cantidadItems: number;
}
