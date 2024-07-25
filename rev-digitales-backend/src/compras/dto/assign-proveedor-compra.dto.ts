import { IsNumber } from 'class-validator';

export class AssignProveedorCompraDto {
  @IsNumber()
  proveedor: number;
}
