import { IsString, IsOptional } from 'class-validator';

export class UpdateTipoPlataformaDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
