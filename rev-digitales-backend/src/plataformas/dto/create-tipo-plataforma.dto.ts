import { IsString, IsOptional } from 'class-validator';

export class CreateTipoPlataformaDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  image?: string;
}
