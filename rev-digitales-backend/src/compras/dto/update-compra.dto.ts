import { IsString, IsOptional, IsDate } from 'class-validator';
export class UpdateCompraDto {
  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDate()
  fecha?: Date;
}
