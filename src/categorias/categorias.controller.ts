import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Categoria } from './interface/categorias.interface';
import { CategoriasService } from './categorias.service';
import { Body, Param } from '@nestjs/common/decorators';
import { CriarCategoriaDto } from './dtos/criarCategoria.dto';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { AtualizarCategoriaDto } from './dtos/atualizarCategoria.dto';

@Controller('/api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  public async hanleGetAllCategorias(): Promise<Categoria[]> {
    return this.categoriasService.buscaTodasCategorias();
  }

  @Get('/:categoriaId')
  public async handleGetCategoriaById(
    @Param('categoriaId') categoriaId: string,
  ): Promise<Categoria> {
    return this.categoriasService.buscaCategoriaPorId(categoriaId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async handleCreateCategoria(
    @Body() criarCategoria: CriarCategoriaDto,
  ): Promise<string> {
    return this.categoriasService.criarCategoria(criarCategoria);
  }

  @Put('/:categoriaId')
  public async handleUpdateCategoria(
    @Param('categoriaId') categoriaId: string,
    @Body() atualizarCategoria: AtualizarCategoriaDto,
  ): Promise<string> {
    return this.categoriasService.atualizarCategoria(
      categoriaId,
      atualizarCategoria,
    );
  }

  @Delete('/:categoriaId')
  public async handleDeleteCategoria(
    @Param('categoriaId') categoriaId: string,
  ): Promise<string> {
    return this.categoriasService.deletarCategoria(categoriaId);
  }

  @Put('/:categoriaId/jogadores/:jogadorId')
  public async handleAdicionarJogadorNaCategoria(
    @Param('categoriaId') categoriaId: string,
    @Param('jogadorId') jogadorId: string,
  ): Promise<string> {
    return this.categoriasService.adicionarJogadorNaCategoria(
      categoriaId,
      jogadorId,
    );
  }
}
