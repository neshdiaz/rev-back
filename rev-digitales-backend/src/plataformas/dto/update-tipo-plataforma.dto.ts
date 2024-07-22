import { IsString, IsOptional } from 'class-validator';

export class UpdateTipoPlataformaDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  image?: string;
}
