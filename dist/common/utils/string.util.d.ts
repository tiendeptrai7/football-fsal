export declare function hashPassword(plainText: string): Promise<string>;
export declare function comparePassword(password: string, storedHash: string): Promise<boolean>;
export declare function capitalizeText(text: string): string;
export declare enum ECharset {
    numbers = "numbers",
    alphabetic = "alphabetic",
    alphanumeric = "alphanumeric"
}
export declare function generateCode(options: {
    length: number;
    charset: ECharset;
    prefix?: string | number;
    postfix?: string | number;
    isUpperCase?: boolean;
}): string;
export declare function stringReplacer<T>(template: string, replacer: T): string;
export declare function formatPrice(value: number | string): string;
export declare function normalizePhone(phone: string): string;
export declare function insertNewlinesAfterWords(input: string, wordInterval: number): string;
export declare function upperCaseFirstLetter(word: string): string;
