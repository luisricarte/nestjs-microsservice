import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/interface/jogador.interface';
import { DesafioStatus } from '../enum/desafioStatus.enum';
import { Partida } from 'src/partidas/interface/partida.interface';

export interface Desafio extends Document {
  dataHoraDesafio: Date;
  status: DesafioStatus;
  dataHoraSolicitacao: Date;
  dataHoraResposta: Date;
  solicitante: Jogador;
  categoria: string;
  jogadores: Array<Jogador>;
  partida: Partida;
}
