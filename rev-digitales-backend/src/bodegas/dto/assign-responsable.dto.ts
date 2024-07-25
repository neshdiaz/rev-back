import { IsNumber } from 'class-validator';

export class assignResponsableDto {
  @IsNumber()
  responsables: number;
}
