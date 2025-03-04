// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';  // Asegúrate de que la ruta sea correcta
import { FinanzasModule } from './finanzas/finanzas.module';
import { Finanza } from './finanzas/finanza.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'production',
      entities: [Finanza, User],
    }),
    AuthModule,  // Ahora puedes usar AuthModule aquí
    FinanzasModule,
  ],
})
export class AppModule {}
