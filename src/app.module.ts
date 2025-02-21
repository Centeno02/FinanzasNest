import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanzasService } from './finanzas/finanzas.service';
import { FinanzasController } from './finanzas/finanzas.controller';
import { Finanza } from './finanzas/finanza.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'srv867.hstgr.io',
      port: 3306,
      username: 'u954703204_tortillita',
      password: 'Nb@N91*5',
      database: 'u954703204_TortilleriaSys',
      synchronize: true,  // Desactivar en producción
      entities: [Finanza],
    }),
    TypeOrmModule.forFeature([Finanza]),  // Registra la entidad
  ],
  providers: [FinanzasService],  // Registra el servicio
  controllers: [FinanzasController],  // Registra el controlador
})
export class AppModule {}
