import { Module } from '@nestjs/common';
import { TrasladosController } from './traslados.controller';

@Module({
  controllers: [TrasladosController],
})
export class TrasladosModule {}
