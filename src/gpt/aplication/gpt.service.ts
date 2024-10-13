import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases';
import { OrtographyCheckDto, ProsConsDiscusserDto, TranlationDto } from '../infrastructure/dto';
//import { OpenAiModule } from '../infrastructure/openai/openai.module';
import { OpenaiService } from '../infrastructure/openai/openai.service';
import { ProConsDisCusseOpenaiService, TranslateOpenaiService } from '../infrastructure/openai';


@Injectable()
export class GptService {
    constructor(
        private readonly openaiService: OpenaiService,
        private readonly proConsDisCusseOpenaiService: ProConsDisCusseOpenaiService,
        private readonly translateOpenaiService: TranslateOpenaiService
    ) { }
    async ortographyCheck(ortographyCheckDto: OrtographyCheckDto) {
        return await this.openaiService.createCompletion(ortographyCheckDto.prompt);
    }
    async prosConsDicusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
        return await this.proConsDisCusseOpenaiService.createCompletion(prosConsDiscusserDto.prompt);
    }
    async translateUseCase(tranlationDto: TranlationDto) {
        return await this.translateOpenaiService.createCompletion(tranlationDto.prompt, tranlationDto.leng);
    }
}

