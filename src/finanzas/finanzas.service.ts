import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Finanza } from './finanza.entity';
import { FinanzasDto } from './dto/finanzas.dto';

@Injectable()
export class FinanzasService {
  constructor(
    @InjectRepository(Finanza)
    private readonly finanzasRepository: Repository<Finanza>,
  ) {}

  async findAll(): Promise<Finanza[]> {
    return this.finanzasRepository.find();
  }

  async create(finanzaDto: FinanzasDto): Promise<Finanza> {
    const finanza = this.finanzasRepository.create(finanzaDto);
    return this.finanzasRepository.save(finanza);
  }

  async update(id: number, finanzaDto: FinanzasDto): Promise<Finanza> {
    const finanza = await this.finanzasRepository.findOne({ where: { id } });
    if (!finanza) {
      throw new NotFoundException(`Finanza con ID ${id} no encontrada`);
    }

    Object.assign(finanza, finanzaDto);
    return this.finanzasRepository.save(finanza);
  }

  async delete(id: number): Promise<{ message: string }> {
    const finanza = await this.finanzasRepository.findOne({ where: { id } });
    if (!finanza) {
      throw new NotFoundException(`Finanza con ID ${id} no encontrada`);
    }

    await this.finanzasRepository.delete(id);
    return { message: `Finanza con ID ${id} eliminada correctamente` };
  }

}
