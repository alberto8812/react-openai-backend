import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from '../aplication/gpt.service';
import { OrtographyCheckDto } from './dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }
  @Post('ortography-check')
  async ortographyCheck(
    @Body() ortographyCheckDto: OrtographyCheckDto,
  ) {
    return await this.gptService.ortographyCheck(ortographyCheckDto);
  }
}
