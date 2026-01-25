import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Jogador } from 'src/jogadores/interface/jogador.interface';
import { Resultado } from './partida.interface';

export class AtribuirPartidaDesafioDto {
  @IsNotEmpty()
  def: ObjectId | Jogador;

  @IsNotEmpty()
  resultado: Array<Resultado>;
}
