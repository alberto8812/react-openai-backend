import { Injectable } from "@nestjs/common";
import OpenAI from "openai";


@Injectable()
export class ProConsDisCusseOpenaiService {

    private readonly openai: OpenAI;
    constructor() {
        this.openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
    }

    async createCompletion(message: string): Promise<any> {
        return await this.openai.chat.completions.create({
            stream: true,
            model: "gpt-4o-mini",
            messages: [
                //configuracion de la conversacion   el rol del sistema es el bot y el rol del usuario es el usuario
                {
                    role: "system",
                    content: `
                     Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
                     la respuesta debe de ser en formato markdown,
                     los pros y contras deben de estar en una lista,
                     
                     separa los parragos con dos saltos de linea,  los pros y contras deben de estar en una lista,
                    
                    `
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            temperature: 0.5,
            max_tokens: 500,
        });
    }
}