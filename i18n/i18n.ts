import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTrans from "./locales/en.json";
import jaTrans from "./locales/ja.json";

const resources = {
  en: {
    translation: enTrans,
  },
  ja: {
    translation: jaTrans,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ja", // if you're using a language detector, do not define the lng option
    fallbackLng: "ja",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
