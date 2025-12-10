import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Evento } from './atualizarCategoria.dto';

export class CriarCategoriaDto {
  @IsString()
  @IsNotEmpty()
  readonly categoria: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  eventos: Array<Evento>;
}
