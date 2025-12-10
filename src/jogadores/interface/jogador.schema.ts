import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    telefoneCelular: { type: String, required: true, unique: true },
    ranking: { type: String, required: false, unique: false },
    posicaoRanking: { type: Number, required: false, unique: false },
    urlFotoJogador: { type: String, required: false, unique: false },
  },
  { collection: 'jogadores', timestamps: true },
);
