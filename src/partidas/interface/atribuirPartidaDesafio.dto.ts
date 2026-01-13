import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Resultado } from 'src/desafios/interface/desafios.interface';
import { Jogador } from 'src/jogadores/interface/jogador.interface';

export class AtribuirPartidaDesafioDto {
  @IsNotEmpty()
  def: ObjectId | Jogador;

  @IsNotEmpty()
  resultado: Resultado[];
}
