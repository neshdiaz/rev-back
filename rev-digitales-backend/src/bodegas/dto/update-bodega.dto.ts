import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class UpdateBodegaDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsBoolean()
  @IsOptional()
  isPrincipal?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
