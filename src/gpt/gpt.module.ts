import { Module } from '@nestjs/common';
import { GptController } from './infrastructure/gpt.controller';
import { GptService } from './aplication/gpt.service';
import { PrismaService } from 'src/common/infractructure/config-dataBase';
import { OpenAiModule } from './infrastructure/openai/openai.module';



@Module({
  controllers: [GptController],
  providers: [GptService, PrismaService],
  imports: [OpenAiModule]
})
export class GptModule { }
