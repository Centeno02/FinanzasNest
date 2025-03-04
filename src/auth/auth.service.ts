import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common'; // Asegúrate de importar ForbiddenException
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity'; // Asegúrate de importar la entidad User

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inyectar el repositorio de usuarios
  ) {}

  // Método para obtener todos los usuarios
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Método para validar usuario y generar un token
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
  
  
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
  
  
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  
    return { id: user.id, email: user.email, role: user.role };
  }
  

  // Método para iniciar sesión y devolver un token
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(body: { username: string; email: string; password: string; role: string }) {
    const { username, email, password, role } = body;
  
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ForbiddenException('El usuario ya existe');
    }
  
    // Hashear la contraseña antes de guardarla
    const hashed_password = await bcrypt.hash(password, 12);
  
    // Crear y guardar el usuario
    const newUser = this.userRepository.create({
      username,
      email,
      hashed_password,
      role,
    });
  
    await this.userRepository.save(newUser);
  
    return { message: 'Usuario registrado exitosamente', user: { username, email, role } };
  }
}
