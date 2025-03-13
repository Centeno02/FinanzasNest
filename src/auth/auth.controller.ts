import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Get('users')
  @UseGuards(JwtAuthGuard)  // Aplica el guard para proteger esta ruta
  async getUsers() {
    return this.authService.getAllUsers();
  }

  // token (ruta POST)
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  // Registrar un nuevo usuario (requiere token)
  @Post('register')
  @UseGuards(JwtAuthGuard)  // Aplica el guard para proteger esta ruta
  async register(@Body() body: { username: string; email: string; password: string; role: string }) {
    return this.authService.register(body);
  }
}
