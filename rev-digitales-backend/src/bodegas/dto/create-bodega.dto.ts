import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateBodegaDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsOptional()
  @IsBoolean()
  isPrincipal?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
