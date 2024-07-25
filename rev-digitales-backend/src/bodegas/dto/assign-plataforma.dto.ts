import { IsNumber } from 'class-validator'
export class assignPlataformaDto {
  @IsNumber()
  plataformas: number;
}
