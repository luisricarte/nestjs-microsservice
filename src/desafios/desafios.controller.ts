import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  //Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { Desafio } from './interface/desafios.interface';
import { CriarDesafioDto } from './dto/criarDesafio.dto';

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
    await this.desafioService.createDesafio(desafio);
    return 'Desafio criado com sucesso';
  }

  /*@Put('/:id')
  public async updateDesafio(): Promise<string> {
    return 'Desafio atualizado';
  }*/
}
