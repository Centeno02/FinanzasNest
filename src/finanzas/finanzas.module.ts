import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanzasController } from './finanzas.controller';
import { FinanzasService } from './finanzas.service';
import { Finanza } from './finanza.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Finanza]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [FinanzasController],
  providers: [FinanzasService],
})
export class FinanzasModule {}
