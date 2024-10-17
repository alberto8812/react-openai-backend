import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import * as multer from 'multer';
import { GptService } from '../aplication/gpt.service';
import { AudioToTextDto, OrtographyCheckDto, ProsConsDiscusserDto, TextToAudioDto, TranlationDto } from './dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }
  @Post('ortography-check')
  async ortographyCheck(
    @Body() ortographyCheckDto: OrtographyCheckDto,
  ) {
    return await this.gptService.ortographyCheck(ortographyCheckDto);
  }
  @Post('pros-cons-discusser')
  async prosConsDicusser(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream = await this.gptService.prosConsDicusser(prosConsDiscusserDto);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK)
    //son muchas emisiones de datos por eso se usa el for await
    for await (const chunk of stream) {
      const pice = chunk.choices[0].delta.content || '';
      res.write(pice);
    }
    res.end();
  }
  @Post('translate')
  async translate(
    @Body() tranlationDto: TranlationDto,
    @Res() res: Response,
  ) {

    const stream = await this.gptService.translateUseCase(tranlationDto);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK)
    //son muchas emisiones de datos por eso se usa el for await
    for await (const chunk of stream) {
      const pice = chunk.choices[0].delta.content || '';
      res.write(pice);
    }
    res.end();
  }
  @Post('text-to-audio')
  async textoToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res: Response,
  ) {

    const filePath = await this.gptService.textoToAudio(textToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK)
    res.sendFile(filePath);
  }
  @Get('text-to-audio/:Fileid')
  async textoToAudioGetter(
    @Param('Fileid') Fileid: string,
    @Res() res: Response,
  ) {
    const filePath = await this.gptService.textoToAudioGetter(Fileid);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK)
    res.sendFile(filePath)
  }

  @Post('audio-to-text')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: './generated/uploads',
      filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${Date.now()}.${fileExtension}`;
        return cb(null, fileName);
      },
    }),
  }))
  async audioTotext(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 * 5, message: 'El archivo es muy grande' }),
          new FileTypeValidator({ fileType: 'audio/*' })
        ]
      })
    ) file: Express.Multer.File,
    @Body() audioToTextDto: AudioToTextDto,
  ) {

    return await this.gptService.createAudioToTest(file, audioToTextDto);

  }
}
