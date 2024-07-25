import { IsNumber } from 'class-validator';

export class AssignPlataformaCompraDto {
  @IsNumber()
  plataformas: number[];
}
