import { Module } from '@nestjs/common';
import { TrasladosController } from './traslados.controller';
import { TrasladosService } from './traslados.service';

@Module({
  controllers: [TrasladosController],
  providers: [TrasladosService]
})
export class TrasladosModule {}
