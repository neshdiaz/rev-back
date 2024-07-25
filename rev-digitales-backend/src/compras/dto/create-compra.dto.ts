import { IsString, IsOptional, IsDate } from 'class-validator';
export class CreateCompraDto {
  @IsOptional()
  @IsString()
  notes?: string;

  @IsDate()
  fecha: Date;
}
