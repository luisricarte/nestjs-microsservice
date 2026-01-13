import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { Desafio } from './interface/desafios.interface';
import { CriarDesafioDto } from './dto/criarDesafio.dto';
import { AtualizarDesafioDto } from './dto/atualizarDesafio.dto';
import { AtribuirPartidaDesafioDto } from 'src/partidas/interface/atribuirPartidaDesafio.dto';

@Controller('/api/v1/desafios')
export class DesafiosController {
  private readonly desafioService: DesafiosService;
  private readonly logger = new Logger(DesafiosController.name);

  constructor(desafiosService: DesafiosService) {
    this.desafioService = desafiosService;
  }

  @Get()
  public async getDesafios(): Promise<Desafio[] | []> {
    return await this.desafioService.getDesafios();
  }

  @Get('/:desafioId')
  public async getDesafioById(
    @Param('desafioId') desafioId: string,
  ): Promise<Desafio | null> {
    return await this.desafioService.getDesafioById(desafioId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async createDesafio(
    @Body() desafio: CriarDesafioDto,
  ): Promise<string> {
    await this.desafioService.createChallenge(desafio);
    return 'Desafio criado com sucesso';
  }

  @Delete('/:desafioId')
  public async deleteDesafio(
    @Param('desafioId') desafioId: string,
  ): Promise<Desafio | string> {
    return await this.desafioService.deleteChallenge(desafioId);
  }

  @Put('/:desafioId')
  public async updateDesafio(
    @Param('desafioId') id: string,
    @Body() desafio: AtualizarDesafioDto,
  ): Promise<string> {
    await this.desafioService.updateDesafio(id, desafio);
    return 'Desafio atualizado com sucesso';
  }

  @Put('/cadastra-partida/:desafioId')
  public async handleCreateMatch(
    @Param('desafioId') desafioId: string,
    @Body() dadosDesafio: AtribuirPartidaDesafioDto,
  ) {
    await this.desafioService.createMatch(desafioId, dadosDesafio);

    return 'Partida cadastrada no Desafio com sucesso!';
  }
}
