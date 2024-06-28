import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { BodegasModule } from './bodegas/bodegas.module';
import { ComprasModule } from './compras/compras.module';
import { PlataformasModule } from './plataformas/plataformas.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { TrasladosModule } from './traslados/traslados.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'netcra',
      database: 'rev_digitales',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    UsuariosModule,
    BodegasModule,
    ComprasModule,
    PlataformasModule,
    ProveedoresModule,
    TrasladosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
