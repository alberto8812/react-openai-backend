import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases';
import { OrtographyCheckDto } from '../infrastructure/dto';
//import { OpenAiModule } from '../infrastructure/openai/openai.module';
import { OpenaiService } from '../infrastructure/openai/openai.service';


@Injectable()
export class GptService {
    constructor(
        private readonly openaiService: OpenaiService
    ) { }
    async ortographyCheck(ortographyCheckDto: OrtographyCheckDto) {
        return await this.openaiService.createCompletion(ortographyCheckDto.prompt);
    }
}

