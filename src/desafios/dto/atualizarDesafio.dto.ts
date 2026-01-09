import { IsDateString, IsString } from 'class-validator';
import { DesafioStatus } from '../enum/desafioStatus.enum';

export class AtualizarDesafioDto {
  @IsDateString()
  dataHoraDesafio: Date;

  @IsString()
  status: DesafioStatus;
}
