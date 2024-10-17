import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { TranslateOpenaiService } from './translate.openai.service';
import { ProConsDisCusseOpenaiService } from './proConsDisCusse.openai.service';
import { TextToAudioOpenaiService } from './text-to-audio.service';
import { AudioToTestService } from '.';


@Module({
  controllers: [],
  providers: [OpenaiService, TranslateOpenaiService, ProConsDisCusseOpenaiService, TextToAudioOpenaiService, AudioToTestService],
  exports: [OpenaiService, TranslateOpenaiService, ProConsDisCusseOpenaiService, TextToAudioOpenaiService, AudioToTestService]
})
export class OpenAiModule { }
