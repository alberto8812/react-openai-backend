import { IsString } from "class-validator";

export class TranlationDto {

    @IsString()
    readonly prompt: string;

    @IsString()
    readonly leng: string;

}   