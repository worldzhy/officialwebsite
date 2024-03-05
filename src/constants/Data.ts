export const LangLocalKey = "InceptionpadLanguage";

export const imagePath =
  "https://officialwebsite-067174804713.s3.amazonaws.com/images/";
export const animationPath =
  "https://officialwebsite-067174804713.s3.amazonaws.com/animation/";

export enum LanguageEnum {
  en = "English",
  spn = "España",
}

export type LangType = keyof typeof LanguageEnum;
