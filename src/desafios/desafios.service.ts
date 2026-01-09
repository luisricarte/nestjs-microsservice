import { Injectable, NotFoundException } from '@nestjs/common';
import { Desafio } from './interface/desafios.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CriarDesafioDto } from './dto/criarDesafio.dto';
import { Jogador } from 'src/jogadores/interface/jogador.interface';
import { Categoria } from 'src/categorias/interface/categorias.interface';
import { ObjectId } from 'mongodb';
import { AtualizarDesafioDto } from './dto/atualizarDesafio.dto';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafios')
    private readonly desafiosModel: Model<Desafio>,
    @InjectModel('Jogadores')
    private readonly jogadorModel: Model<Jogador>,
    @InjectModel('Categorias')
    private readonly categoriaModel: Model<Categoria>,
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

  public async createChallenge(challenge: CriarDesafioDto): Promise<Desafio> {
    const challengePlayers = challenge.jogadores;
    const applicant = challenge.solicitante;

    const validPlayerFound =
      await this.handleValidateExistsPlayer(challengePlayers);

    const isPlayerApplicant = this.handleIsApplicantInPlayers(
      applicant,
      challengePlayers,
    );

    const applicantHasCategory =
      await this.handleApplicantHasCategory(applicant);

    if (!applicantHasCategory) {
      throw new NotFoundException(
        `O solicitante do desafio não está cadastrado em nenhuma categoria`,
      );
    }

    if (!validPlayerFound) {
      throw new NotFoundException(`Há pelo menos um jogador não encontrado`);
    }

    if (!isPlayerApplicant) {
      throw new NotFoundException(
        `O solicitante do desafio deve estar entre os jogadores participantes`,
      );
    }
    const novoDesafio = new this.desafiosModel(challenge);
    return await novoDesafio.save();
  }

  public async handleValidateExistsPlayer(
    jogadores: string[],
  ): Promise<boolean> {
    const playersFound = await Promise.all(
      jogadores.map((jogador) => this.jogadorModel.findById(jogador).exec()),
    );

    return playersFound.every((jogador) => jogador !== null);
  }

  public async handleApplicantHasCategory(
    solicitante: string,
  ): Promise<boolean> {
    const playerFound = await this.jogadorModel.findById(solicitante).exec();

    if (!playerFound) {
      throw new NotFoundException('Jogador solicitante não existe');
    }

    const findAllCategories = await this.categoriaModel.find().exec();

    for (const category of findAllCategories) {
      const categoryPlayers = category.jogadores;

      if (categoryPlayers.length === 0) {
        continue;
      } else {
        for (const playerId of categoryPlayers as ObjectId[]) {
          if (playerId.equals(playerFound._id)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  public handleIsApplicantInPlayers(
    applicant: string,
    players: string[],
  ): boolean {
    return players.some((player) => player.toString() === applicant.toString());
  }

  public async deleteDesafio(_id: string) {
    const desafioEncontrado = await this.desafiosModel.findById({ _id }).exec();

    if (!desafioEncontrado) {
      throw new NotFoundException(
        `Desafio com id ${_id} não encontrado, não foi possível deletar`,
      );
    }

    await this.desafiosModel.deleteOne({ _id }).exec();

    return 'Desafio deletado com sucesso';
  }

  public async updateDesafio(
    _id: string,
    desafioDto: AtualizarDesafioDto,
  ): Promise<void> {
    const challenge = await this.desafiosModel.findById(_id);

    if (!challenge) {
      throw new NotFoundException('Desafio não encontrado');
    }

    await this.desafiosModel.updateOne(
      { _id },
      {
        $set: {
          dataHoraDesafio: desafioDto.dataHoraDesafio,
          status: desafioDto.status,
        },
      },
    );
  }
}
