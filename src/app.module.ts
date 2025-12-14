import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.661an4y.mongodb.net/?appName=Cluster0`,
    ),
    CategoriasModule,
  ],
})
export class AppModule {}
