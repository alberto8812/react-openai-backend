import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { TranslateOpenaiService } from './translate.openai.service';
import { ProConsDisCusseOpenaiService } from './proConsDisCusse.openai.service';
import { TextToAudioOpenaiService } from './text-to-audio.service';


@Module({
  controllers: [],
  providers: [OpenaiService, TranslateOpenaiService, ProConsDisCusseOpenaiService, TextToAudioOpenaiService],
  exports: [OpenaiService, TranslateOpenaiService, ProConsDisCusseOpenaiService, TextToAudioOpenaiService]
})
export class OpenAiModule { }
