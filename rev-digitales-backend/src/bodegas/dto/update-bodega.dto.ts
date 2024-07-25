import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class UpdateBodegaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  isPrincipal?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
