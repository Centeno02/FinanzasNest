// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',  // Puedes definir una clave secreta aquí
      signOptions: { expiresIn: '1h' }, // Expiración del token (1 hora en este caso)
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], // Asegúrate de exportar AuthService si lo necesitas en otros módulos
})
export class AuthModule {}
