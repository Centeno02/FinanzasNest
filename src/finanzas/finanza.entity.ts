import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('finanzas')  // Nombre de la tabla en la base de datos
export class Finanza {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['ingreso', 'gasto'],
  })
  tipo: 'ingreso' | 'gasto';

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column('date')
  fecha: string;
}
