import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanzasController } from './finanzas.controller';
import { FinanzasService } from './finanzas.service';
import { Finanza } from './finanza.entity';
import { AuthModule } from '../auth/auth.module'; // Importa el AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Finanza]),
    AuthModule,
  ],
  controllers: [FinanzasController],
  providers: [FinanzasService],
})
export class FinanzasModule {}
