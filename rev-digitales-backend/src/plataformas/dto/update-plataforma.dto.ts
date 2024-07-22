import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTipoPlataformaDto } from './create-tipo-plataforma.dto';

export class UpdatePlataformaDto {
  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsString()
  @IsOptional()
  contrasena?: string;

  @IsNumber()
  @IsOptional()
  costo_unitario_compra?: number;

  @IsNumber()
  @IsOptional()
  vigencia?: number;

  @IsNumber()
  @IsOptional()
  tipo_plataforma?: CreateTipoPlataformaDto;
}
