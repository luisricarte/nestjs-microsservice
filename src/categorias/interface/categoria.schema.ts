import * as mongoose from 'mongoose';

export const CategoriaSchema = new mongoose.Schema(
  {
    categoria: { type: String, unique: true },
    eventos: [
      {
        nome: { type: String },
        operacao: { type: String },
        valor: { type: Number },
      },
    ],
    jogadores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' }],
  },
  { collection: 'categorias', timestamps: true },
);
