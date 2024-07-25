import { IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
