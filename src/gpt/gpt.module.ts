import { Module } from '@nestjs/common';
import { GptController } from './infrastructure/gpt.controller';
import { PrismaService } from 'src/common/infractructure/config-dataBase';
import { OpenAiModule } from './infrastructure/openai/openai.module';
import { ProConsDisCusseOpenaiService } from './infrastructure/openai';
import { GptService } from './aplication/gpt.service';



@Module({
  controllers: [GptController],
  providers: [GptService, ProConsDisCusseOpenaiService, PrismaService],
  imports: [OpenAiModule]
})
export class GptModule { }
