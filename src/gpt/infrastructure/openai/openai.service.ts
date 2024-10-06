import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
    private readonly openai: OpenAI;
    constructor() {
        this.openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
    }
    async createCompletion(message: string): Promise<any> {
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                //configuracion de la conversacion   el rol del sistema es el bot y el rol del usuario es el usuario
                {
                    role: "system", content: `
                     Te seran presentadas una serie de oraciones, las cuales deberas corregir en caso de que contengan errores ortograficos.
                     tambien debes retonar un porcentaje de acierto de la correccion de la oracion.
                      si no hay errores ortograficos en la oracion, debes retornar un porcentaje de acierto de 100%.

                      Ejemplo de salida:
                      {
                        "message": "string",// usa emojis y texto para felicitar
                        "accuracy": 100
                        "error": [] // si hay errores, retorna el error de esta manera Error->correccion
                      }
                    `
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            temperature: 0.5,
            max_tokens: 150,
        });
        const jsonResult = JSON.parse(completion.choices[0].message.content); // convierte el resultado en un json
        return jsonResult;

    }

}
