import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from '../aplication/gpt.service';
import { OrtographyCheckDto, ProsConsDiscusserDto, TranlationDto } from './dto';
import { Response } from 'express';

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
}
