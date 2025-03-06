import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Logger } from '@nestjs/common';
import { FinanzasService } from './finanzas.service';
import { FinanzasDto } from './dto/finanzas.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('finanzas')
export class FinanzasController {
  private readonly logger = new Logger(FinanzasController.name);

  constructor(private readonly finanzasService: FinanzasService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    this.logger.log('Obteniendo todas las finanzas');
    return this.finanzasService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)

  async create(@Body() finanzaDto: FinanzasDto) {
    this.logger.log(`Creando nueva finanza: ${JSON.stringify(finanzaDto)}`);
    return this.finanzasService.create(finanzaDto);
  }
  // rutas también protegidas por JWT
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() finanzaDto: FinanzasDto) {
    this.logger.log(`Actualizando finanza con ID ${id}`);
    return this.finanzasService.update(id, finanzaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number) {
    this.logger.log(`Eliminando finanza con ID ${id}`);
    return this.finanzasService.delete(id);
  }
}
