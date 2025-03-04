import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Logger } from '@nestjs/common';
import { FinanzasService } from './finanzas.service';
import { FinanzasDto } from './dto/finanzas.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('finanzas')
//@UseGuards(JwtAuthGuard) // Ahora las rutas requieren autenticación
export class FinanzasController {
  private readonly logger = new Logger(FinanzasController.name);

  constructor(private readonly finanzasService: FinanzasService) {}

  @Get()
  async findAll() {
    this.logger.log('Obteniendo todas las finanzas');
    return this.finanzasService.findAll();
  }

  @Post()
  async create(@Body() finanzaDto: FinanzasDto) {
    this.logger.log(`Creando nueva finanza: ${JSON.stringify(finanzaDto)}`);
    return this.finanzasService.create(finanzaDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() finanzaDto: FinanzasDto) {
    this.logger.log(`Actualizando finanza con ID ${id}`);
    return this.finanzasService.update(id, finanzaDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.logger.log(`Eliminando finanza con ID ${id}`);
    return this.finanzasService.delete(id);
  }
}
