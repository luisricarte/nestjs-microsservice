import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Logger,
  Param,
  Delete,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interface/jogador.interface';
import { AtualizarJogadorDto } from './dtos/atualizarJogador.dto';
import { JogadoresValidacaoParametrosPipe } from '../common/pipes/jogadoresValidacaoParametros.pipe';

@Controller('/api/v1/jogadores')
export class JogadoresController {
  private readonly jogadoresService: JogadoresService;
  private readonly logger = new Logger(JogadoresController.name);
  constructor(jogadoresService: JogadoresService) {
    this.jogadoresService = jogadoresService;
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async handleCreateJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<string> {
    await this.jogadoresService.criarJogador(criarJogadorDto);

    return 'Jogador Criado com sucesso';
  }

  @Get()
  async handleGetJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarJogadores();
  }

  @Get('/:id')
  async handleGetJogadorByid(
    @Param('id', JogadoresValidacaoParametrosPipe) id: string,
  ): Promise<Jogador | null> {
    return await this.jogadoresService
      .consultarJogadorById(id)
      .then((jogador) => jogador);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  public async handleUpdateJogador(
    @Body() jogador: AtualizarJogadorDto,
    @Param('id') id: string,
  ): Promise<string> {
    this.logger.log(`atualizando jogador`);

    if (!id) {
      throw new NotFoundException('id do jogador não foi fornecido');
    }

    if (
      await this.jogadoresService
        .consultarJogadorById(id)
        .then((jogador) => !jogador)
    ) {
      throw new NotFoundException(`Jogador com id ${id} não encontrado`);
    }

    await this.jogadoresService.atualizarJogador(jogador, id);

    return JSON.stringify({
      message: `Jogador com id ${id} atualizado com sucesso`,
    });
  }

  @Delete('/:id')
  async handleDeleteJogador(
    @Param('id', JogadoresValidacaoParametrosPipe) id: string,
  ): Promise<string> {
    if (
      await this.jogadoresService
        .consultarJogadorById(id)
        .then((jogador) => !jogador)
    ) {
      throw new NotFoundException(`Jogador com id ${id} não encontrado`);
    }

    await this.jogadoresService.deletarJogador(id);

    return JSON.stringify({
      message: `Jogador com id ${id} deletado com sucesso`,
    });
  }
}
