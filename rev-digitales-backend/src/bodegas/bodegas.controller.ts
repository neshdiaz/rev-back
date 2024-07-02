import { CreateBodegaDto } from './dto/create-bodega.dto';
import { UpdateBodegaDto } from './dto/update-bodega.dto';
import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BodegasService } from './bodegas.service';

@Controller('bodegas')
export class BodegasController {
  constructor(private bodegasService: BodegasService) {}

  @Post()
  createBodega(@Body() newBodega: CreateBodegaDto) {
    return this.bodegasService.createBodega(newBodega);
  }
}
