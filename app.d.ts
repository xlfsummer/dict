declare interface ITranslateResult{
    errorCode: string;

    /** 查询正确时，一定存在 */
    query: string;

    /** 查询正确时，一定存在 */
    translation: string[];
    basic: {

        phonetic: string;
        /** 英式音标 */
        "uk-phonetic": string;

        /** 美式音标 */
        "us-phonetic": string;

        /** 英式发音 */
        "uk-speech": "XXXX",

        /** 美式发音 */
        "us-speech": "XXXX",

        explains: string[];
    };

    /** 有道词典-网络释义，该结果不一定存在 */
    web: {
        key: string;
        value: string[];
    }[];

    dict: { url: string; };

    webdict: { url: string; };

    /** language */
    l: string;

    tSpeakUrl: string;
    speakUrl: string;
}

type Language = "zh-CHS" | "ja" | "EN" | "ko" | "fr" | "ru" | "pt" | "es" | "vi";


type Config = {
    /**
     * 应用ID
     * @example 488cd28f1749c93e
     */
    appKey: string;

    /**
     * 应用密钥
     * @example "794R5bA6OGdig5N1cFm5IF4R9qRaYDjs"
     */
    appSecret: string;
}