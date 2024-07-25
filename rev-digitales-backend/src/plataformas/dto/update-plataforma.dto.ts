import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTipoPlataformaDto } from './create-tipo-plataforma.dto';

export class UpdatePlataformaDto {
  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  contrasena?: string;

  @IsOptional()
  @IsNumber()
  costo_unitario_compra?: number;

  @IsOptional()
  @IsNumber()
  vigencia?: number;

  @IsOptional()
  @IsNumber()
  tipo_plataforma?: CreateTipoPlataformaDto;
}
