import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    try {
      // Verificamos si la conexión está activa
      await this.connection.query('SELECT 1');
      console.log('Conexión a la base de datos MySQL exitosa!');
    } catch (error) {
      console.error('Error al conectar a la base de datos MySQL:', error);
    }
  }
}
