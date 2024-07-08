import { CreatePlataformaDto } from './dto/create-plataforma.dto';
import { CreateTipoPlataformaDto } from './dto/create-tipo-plataforma.dto';
import { UpdatePlataformaDto } from './dto/update-plataforma.dto';
import { UpdateTipoPlataformaDto } from './dto/update-tipo-plataforma.dto';
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
import { PlataformasService } from './plataformas.service';

@Controller('plataformas')
export class PlataformasController {
  constructor(private plataformasService: PlataformasService) {}

  @Post()
  createPlataforma(@Body() newPlataforma: CreatePlataformaDto) {
    return this.plataformasService.createPlataforma(newPlataforma);
  }

  @Post('/tipo-plataforma/')
  createTipoPlataforma(@Body() newTipoPlataforma: CreateTipoPlataformaDto) {
    return this.plataformasService.createTipoPlataforma(newTipoPlataforma);
  }

  @Get()
  getPlataformas() {
    return this.plataformasService.getPlataformas();
  }

  @Get()
  getTiposPlataformas() {
    return this.plataformasService.getTiposPlataformas();
  }

  @Get(':id')
  getPlataforma(@Param('id', ParseIntPipe) id: number) {
    return this.plataformasService.getPlataforma(id);
  }

  @Get('/tipo-plataforma/:id')
  getTipoPlataforma(@Param('id', ParseIntPipe) id: number) {
    return this.plataformasService.getTipoPlataforma(id);
  }

  @Delete(':id')
  deletePlataforma(@Param('id', ParseIntPipe) id: number) {
    return this.plataformasService.deletePlataforma(id);
  }

  @Delete('tipo-plataforma/:id')
  deleteTipoPlataforma(@Param('id', ParseIntPipe) id: number) {
    return this.plataformasService.deleteTipoPlataforma(id);
  }

  @Patch(':id')
  updatePlataforma(
    @Param('id', ParseIntPipe) id: number,
    @Body() plataforma: UpdatePlataformaDto,
  ) {
    return this.plataformasService.updatePlataforma(id, plataforma);
  }

  @Patch(':id')
  updateTipoPlataforma(
    @Param('id', ParseIntPipe) id: number,
    @Body() tipoPlataforma: UpdateTipoPlataformaDto,
  ) {
    return this.plataformasService.updatePlataforma(id, tipoPlataforma);
  }
}
