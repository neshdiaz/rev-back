import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenido. Esta es la API administrativa de la App Reventas Digitales';
  }
}
