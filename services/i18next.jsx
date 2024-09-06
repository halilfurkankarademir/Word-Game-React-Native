import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

export const languages = {
    en: { translation: en },
    tr: { translation: tr },
};

i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: "tr",
    fallbackLng: "en",
    resources: languages,
});

export default i18next;
