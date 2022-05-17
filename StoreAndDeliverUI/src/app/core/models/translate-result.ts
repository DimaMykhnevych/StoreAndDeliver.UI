export interface TranslateResult {
  detectedLanguage: { language: string; score: number };
  translations: { text: string; to: string }[];
}
