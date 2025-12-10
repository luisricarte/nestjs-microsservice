import { Document } from 'mongoose';

export interface Jogador extends Document {
  id: string;
  telefoneCelular: string;
  email: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}
