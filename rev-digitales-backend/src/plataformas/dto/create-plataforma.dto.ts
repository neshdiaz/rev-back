import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreatePlataformaDto {
  @IsEmail()
  correo: string;

  @IsString()
  contrasena: string;

  @IsNumber()
  costo_unitario_compra: number;

  @IsNumber()
  vigencia: number;
}
