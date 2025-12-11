import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interface/categorias.interface';
import { Model } from 'mongoose';
import { AtualizarCategoriaDto } from './dtos/atualizarCategoria.dto';
import { CriarCategoriaDto } from './dtos/criarCategoria.dto';
import { Jogador } from 'src/jogadores/interface/jogador.interface';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categorias')
    private readonly categoriaModel: Model<Categoria>,

    @InjectModel('Jogadores')
    private readonly jogadorModel: Model<Jogador>,
  ) {}

  public async buscaTodasCategorias(): Promise<Categoria[]> {
    return this.categoriaModel.find().exec();
  }

  public async buscaCategoriaPorId(_id: string): Promise<Categoria> {
    const categoria = await this.categoriaModel.findOne({ _id }).exec();

    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }

    return categoria;
  }

  public async criarCategoria(
    criarCategoria: CriarCategoriaDto,
  ): Promise<string> {
    await this.categoriaModel.create(criarCategoria);

    return 'Categoria criada com sucesso';
  }

  public async atualizarCategoria(
    id: string,
    atualizarCategoria: AtualizarCategoriaDto,
  ) {
    const categoriaEncontrada = await this.categoriaModel.findById(id).exec();

    if (!categoriaEncontrada) {
      throw new Error('Categoria não encontrada');
    }

    await this.categoriaModel
      .findByIdAndUpdate(id, { $set: atualizarCategoria })
      .exec();
    return `Categoria com id ${id} atualizada com sucesso!`;
  }

  public async deletarCategoria(id: string) {
    await this.categoriaModel.findByIdAndDelete(id).exec();

    return `Categoria com id ${id} deletada com sucesso!`;
  }

  public async adicionarJogadorNaCategoria(
    categoriaId: string,
    jogadorId: string,
  ): Promise<string> {
    const jogadorEncontrado = await this.jogadorModel
      .findById(jogadorId)
      .exec();

    const categoriaEncontrada = await this.categoriaModel
      .findById(categoriaId)
      .exec();

    if (!categoriaEncontrada) {
      throw new Error('Categoria não encontrada');
    }

    if (!jogadorEncontrado) {
      throw new Error('Jogador não encontrado');
    }

    this.categoriaModel.findOneAndUpdate(
      { _id: categoriaId },
      { $addToSet: { jogadores: jogadorEncontrado._id } },
    );

    await this.categoriaModel
      .findByIdAndUpdate(categoriaId, { $set: categoriaEncontrada })
      .exec();

    return 'Jogador adicionado na categoria com sucesso!';
  }
}
