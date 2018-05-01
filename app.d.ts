declare interface ILanguage {
    "zh-CHS",
    "ja",
    "EN",
    "ko",
    "fr",
    "ru",
    "pt",
    "es",
    "vi"
}

declare interface ITranslateResult{
    errorCode: string;
    query: string;
    translation: string[];
    basic: {
        
    };
    web: {
        key: string;
        value: string[];
    }[];
    dict: { url: string; };
    webdict: { url: string; };
    l: string;
    tSpeakUrl: string;
    speakUrl: string;
}

type Language = keyof ILanguage;

function a(from: Language): void;