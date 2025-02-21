import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Finanza } from './finanza.entity';

@Injectable()
export class FinanzasService {
  constructor(
    @InjectRepository(Finanza)
    private readonly finanzaRepository: Repository<Finanza>,
  ) {}

  // Método para obtener todas las finanzas
  async findAll(): Promise<Finanza[]> {
    return await this.finanzaRepository.find();
  }

  // Método para crear una nueva entrada de finanza
  async create(finanza: Partial<Finanza>): Promise<Finanza> {
    const newFinanza = this.finanzaRepository.create(finanza);
    return await this.finanzaRepository.save(newFinanza);
  }
}
