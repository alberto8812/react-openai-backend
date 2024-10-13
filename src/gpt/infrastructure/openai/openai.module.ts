import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { TranslateOpenaiService } from './translate.openai.service';
import { ProConsDisCusseOpenaiService } from './proConsDisCusse.openai.service';


@Module({
  controllers: [],
  providers: [OpenaiService, TranslateOpenaiService, ProConsDisCusseOpenaiService],
  exports: [OpenaiService, TranslateOpenaiService, ProConsDisCusseOpenaiService]
})
export class OpenAiModule { }
