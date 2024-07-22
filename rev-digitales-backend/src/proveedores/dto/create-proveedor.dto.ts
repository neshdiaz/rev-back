import { IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  paginaWeb?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
