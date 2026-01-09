import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafiosSchema } from './interface/desafios.schema';
import { JogadorSchema } from 'src/jogadores/interface/jogador.schema';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CategoriaSchema } from 'src/categorias/interface/categoria.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Desafios', schema: DesafiosSchema },
      { name: 'Jogadores', schema: JogadorSchema },
      { name: 'Categorias', schema: CategoriaSchema },
    ]),
    JogadoresModule,
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService],
})
export class DesafiosModule {}
