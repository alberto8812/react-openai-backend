import OpenAI from "openai";
import * as fs from "fs";


interface Option {
    prompt?: string;
    audioFile: Express.Multer.File;
}

export class AudioToTestService {
    private readonly openai: OpenAI;
    constructor() {
        this.openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
    }

    async createAudioToTest(option: Option): Promise<any> {
        const completion = await this.openai.audio.transcriptions.create({
            model: "whisper-1",
            file: fs.createReadStream(option.audioFile.path),
            prompt: option.prompt,
            language: "es",
            response_format: "verbose_json",//formato de salida vtt para obtener los tiempos de inicio y fin de cada palabra
        });

        return completion;

    }
}