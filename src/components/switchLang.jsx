import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex flex-col items-end justify-end gap-4 p-5 mx-5">
      <div>{t('change')}</div>
      <button className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-orange-200 to-red-500 text-white" onClick={() => changeLanguage("en")}>English</button>
      <button className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white" onClick={() => changeLanguage("th")}>ภาษาไทย</button>

      
    </div>
  );
}
