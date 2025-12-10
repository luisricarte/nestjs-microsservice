import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './interface/categoria.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Categorias', schema: CategoriaSchema },
    ]),
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
