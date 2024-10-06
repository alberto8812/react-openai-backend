
interface Option {
    prompt: string;
    max_tokens?: number;
}

export const ortographyCheckUseCase = async (option: Option) => {
    return {
        propmt: option.prompt,
        max_tokens: option.max_tokens || 100,
    }
}