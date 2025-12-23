import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { Jogador } from './interface/jogador.interface';
import { AtualizarJogadorDto } from './dtos/atualizarJogador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador')
    private readonly jogadorModel: Model<Jogador>,
  ) {}

  public async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { nome, email, telefoneCelular } = criarJogadorDto;

    if (await this.consultarJogadorByEmail(email)) {
      throw new ConflictException(`Jogador com email ${email} já cadastrado.`);
    }

    await new this.jogadorModel({
      nome,
      email,
      telefoneCelular,
      ranking: '',
      posicaoRanking: 0,
      urlFotoJogador: '',
    }).save();
  }

  public consultarJogadores(): Promise<Jogador[]> {
    return this.jogadorModel.find().exec();
  }

  public async consultarJogadorByEmail(email: string): Promise<boolean> {
    return !!(await this.jogadorModel.exists({ email }).exec());
  }

  public async consultarJogadorById(_id: string): Promise<Jogador> {
    const jogadorEncontrado =
      (await this.jogadorModel.findOne({ _id }).exec()) || null;

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado.`);
    }
    return jogadorEncontrado;
  }

  public async atualizarJogador(
    jogador: AtualizarJogadorDto,
    email: string,
  ): Promise<string> {
    const { ranking, nome, posicaoRanking, urlFotoJogador, telefoneCelular } =
      jogador;

    await this.jogadorModel.updateOne(
      { email },
      {
        $set: {
          ranking: ranking ?? '',
          nome,
          posicaoRanking: posicaoRanking ?? 0,
          urlFotoJogador: urlFotoJogador ?? '',
          telefoneCelular: telefoneCelular ?? '',
        },
      },
    );

    return `Jogador com email ${email} atualizado com sucesso`;
  }

  public async deletarJogador(_id: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return await this.jogadorModel.deleteOne({ _id }).exec();
  }
}
