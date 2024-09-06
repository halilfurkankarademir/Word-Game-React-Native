import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import tr from "../locales/tr.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const languages = {
    en: { translation: en },
    tr: { translation: tr },
};

const initI18next = async () => {
    try {
        const savedLang = await AsyncStorage.getItem('language');
        const defaultLang = savedLang || 'en';

        await i18next.use(initReactI18next).init({
            compatibilityJSON: "v3",
            lng: defaultLang,
            fallbackLng: "en",
            resources: languages,
        });
    } catch (error) {
        console.error('Error initializing i18next:', error);
    }
};

initI18next();

export default i18next;
