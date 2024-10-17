import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases';
import { AudioToTextDto, OrtographyCheckDto, ProsConsDiscusserDto, TextToAudioDto, TranlationDto } from '../infrastructure/dto';
//import { OpenAiModule } from '../infrastructure/openai/openai.module';
import { OpenaiService } from '../infrastructure/openai/openai.service';
import { AudioToTestService, ProConsDisCusseOpenaiService, TextToAudioOpenaiService, TranslateOpenaiService } from '../infrastructure/openai';
import * as path from 'path';
import * as fs from 'fs';


@Injectable()
export class GptService {
    constructor(
        private readonly openaiService: OpenaiService,
        private readonly proConsDisCusseOpenaiService: ProConsDisCusseOpenaiService,
        private readonly translateOpenaiService: TranslateOpenaiService,
        private readonly textToAudioOpenaiService: TextToAudioOpenaiService,
        private readonly audioToTestService: AudioToTestService
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
    async textoToAudio(textToAudioDto: TextToAudioDto,) {
        return await this.textToAudioOpenaiService.createCompletion(textToAudioDto.prompt, textToAudioDto.voice ?? 'nova');
    }

    async textoToAudioGetter(Fileid: string,) {
        const filePath = path.resolve(__dirname, `../../../generated/audios/`, `${Fileid}.mp3`);
        const wasFound = fs.existsSync(filePath);
        console.log(wasFound, "filePath");
        if (!wasFound) throw new NotFoundException(`El archivo ${Fileid}.mp3 no existe en la carpeta generada.`);

        return filePath;

    }

    async createAudioToTest(audioFile: Express.Multer.File, audioToTextDto: AudioToTextDto) {
        const { prompt } = audioToTextDto;
        return await this.audioToTestService.createAudioToTest({ audioFile, prompt });
    }
}

