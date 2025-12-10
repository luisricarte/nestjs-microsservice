import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
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

  @Get('/:id')
  public async handleGetCategoriaById(
    @Query('id') id: string,
  ): Promise<Categoria> {
    return this.categoriasService.buscaCategoriaPorId(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async handleCreateCategoria(
    @Body() criarCategoria: CriarCategoriaDto,
  ): Promise<Categoria> {
    return this.categoriasService.criarCategoria(criarCategoria);
  }

  @Put('/:id')
  public async handleUpdateCategoria(
    @Param('id') id: string,
    @Body() atualizarCategoria: AtualizarCategoriaDto,
  ): Promise<string> {
    return this.categoriasService.atualizarCategoria(id, atualizarCategoria);
  }

  @Delete('/:id')
  public async handleDeleteCategoria(@Query('id') id: string): Promise<string> {
    return this.categoriasService.deletarCategoria(id);
  }

  @Post('/:categoriaId/jogadores/:jogadorId')
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
