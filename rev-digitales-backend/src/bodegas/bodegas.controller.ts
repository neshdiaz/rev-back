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
import { assignResponsableDto } from './dto/assign-responsable.dto';

@Controller('bodegas')
export class BodegasController {
  constructor(private bodegasService: BodegasService) {}

  @Post()
  createBodega(@Body() newBodega: CreateBodegaDto) {
    return this.bodegasService.createBodega(newBodega);
  }

  @Get()
  getBodegas() {
    return this.bodegasService.getBodegas();
  }

  @Get(':id')
  getBodega(@Param('id', ParseIntPipe) id: number) {
    return this.bodegasService.getBodega(id);
  }

  @Delete(':id')
  deleteBodega(@Param('id', ParseIntPipe) id: number) {
    return this.bodegasService.deleteBodega(id);
  }

  @Patch(':id')
  updateBodega(
    @Param('id', ParseIntPipe) id: number,
    @Body() bodega: UpdateBodegaDto,
  ) {
    return this.bodegasService.updateBodega(id, bodega);
  }

  @Patch('assign_responsable/:id')
  assignResponsableBodega(
    @Param('id', ParseIntPipe) id: number,
    @Body() responsables: assignResponsableDto,
  ) {
    return this.bodegasService.assignResponsable(id, responsables);
  }
}
