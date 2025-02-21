import { Controller, Get, Post, Body } from '@nestjs/common';
import { FinanzasService } from './finanzas.service';
import { Finanza } from './finanza.entity';

@Controller('finanzas')
export class FinanzasController {
  constructor(private readonly finanzasService: FinanzasService) {}

  // Ruta para obtener todas las finanzas
  @Get()
  async findAll(): Promise<Finanza[]> {
    return this.finanzasService.findAll();
  }

  // Ruta para crear una nueva finanza
  @Post()
  async create(@Body() finanza: Partial<Finanza>): Promise<Finanza> {
    return this.finanzasService.create(finanza);
  }
}
