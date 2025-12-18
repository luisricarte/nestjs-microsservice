import { Injectable, NotFoundException } from '@nestjs/common';
import { Desafio } from './interface/desafios.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CriarDesafioDto } from './dto/criarDesafio.dto';
import { Jogador } from 'src/jogadores/interface/jogador.interface';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafios')
    private readonly desafiosModel: Model<Desafio>,
    @InjectModel('Jogadores')
    private readonly jogadorModel: Model<Jogador>,
  ) {}

  public async getDesafios() {
    return await this.desafiosModel.find().exec();
  }

  public async getDesafioById(_id: string): Promise<Desafio | null> {
    const desafioEncontrado = await this.desafiosModel.findById({ _id }).exec();

    if (!desafioEncontrado) {
      throw new NotFoundException(`Desafio com id ${_id} não encontrado`);
    }

    return await this.desafiosModel.findById({ _id }).exec();
  }

  public async createDesafio(desafio: CriarDesafioDto): Promise<Desafio> {
    const jogadoresValidos = desafio.jogadores;

    const jogadoresValidosEncontrados =
      await this.validarJogadores(jogadoresValidos);

    if (!jogadoresValidosEncontrados) {
      throw new NotFoundException(`Há pelo menos um jogador não encontrado`);
    }

    const novoDesafio = new this.desafiosModel(desafio);
    return await novoDesafio.save();
  }

  public async validarJogadores(jogadores: Jogador[]): Promise<boolean> {
    const jogadoresEncontrados = await Promise.all(
      jogadores.map((jogador) => this.jogadorModel.findById(jogador).exec()),
    );

    return jogadoresEncontrados.every((jogador) => jogador !== null);
  }
}
