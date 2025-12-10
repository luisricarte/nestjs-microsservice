import { ArrayMinSize, IsOptional, IsString } from 'class-validator';

export class AtualizarCategoriaDto {
  readonly categoria?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsOptional()
  @ArrayMinSize(1)
  eventos?: Array<Evento>;
}

export class Evento {
  nome: string;
  descricao: string;
  valor: number;
}
