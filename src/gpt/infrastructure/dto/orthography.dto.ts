import { IsInt, IsOptional, IsString } from "class-validator";

export class OrtographyCheckDto {

    @IsString()
    readonly prompt: string;

    @IsInt()
    @IsOptional()
    readonly max_tokens?: number;
}