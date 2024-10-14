import { Injectable } from "@nestjs/common";
import OpenAI from "openai";


@Injectable()
export class TranslateOpenaiService {

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
    async createCompletion(message: string, lang: string): Promise<any> {
        return await this.openai.chat.completions.create({
            stream: true,
            model: "gpt-4o-mini",
            messages: [
                //configuracion de la conversacion   el rol del sistema es el bot y el rol del usuario es el usuario
                {
                    role: "system",
                    content: `Traduce el siguiente texto al idioma ${lang}:${message}`
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            temperature: 0.2,
        });
    }
}