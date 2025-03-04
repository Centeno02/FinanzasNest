import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

export class FinanzasDto {
  @IsEnum(['ingreso', 'gasto'], { message: 'El tipo debe ser ingreso o gasto' })
  tipo: 'ingreso' | 'gasto';

  @IsNumber({}, { message: 'El monto debe ser un número' })
  monto: number;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  descripcion?: string;

  @IsDateString({}, { message: 'La fecha debe estar en formato YYYY-MM-DD' })
  fecha: string;
}
