import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class TextToAudioOpenaiService {

    private readonly openai: OpenAI;
    constructor() {
        this.openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
    }

    /**
     * mwetodo que traduce un texto a un idioma especifico
     * @param message 
     * @param lang 
     * @returns 
     */
    async createCompletion(message: string, voice: string): Promise<any> {
        const selectedVoice = {
            alloy: 'alloy',
            echo: 'echo',
            fable: 'fable',
            onyx: 'onyx',
            nova: 'nova',
            shimmer: 'shimmer',
        }
        const voiceSelected = selectedVoice[voice] || 'nova';
        /**
         * se crea el archivo de audio
         * se crea la carpeta si no existe
         * se crea el archivo de audio
         * guarda archivos en carpeta no con terceros
         */
        const folderPath = path.resolve(__dirname, `../../../../generated/audios`);
        const speechFile = path.resolve(`${folderPath}/${Date.now()}.mp3`);
        fs.mkdirSync(folderPath, { recursive: true });

        const mp3 = await this.openai.audio.speech.create({
            model: "tts-1",
            voice: voiceSelected,
            input: message,
            response_format: "mp3",
        })

        const buffer = Buffer.from(await mp3.arrayBuffer());
        fs.writeFileSync(speechFile, buffer);

        return speechFile
    }
}