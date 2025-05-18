"use client";

import { Button } from "antd";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <Button
      className="ml-3"
      shape="circle"
      size="large"
      onClick={() => {
        if (i18n.language === "en") {
          i18n.changeLanguage("ja");
        } else {
          i18n.changeLanguage("en");
        }
      }}
    >
      {i18n.language === "en" ? "EN" : "JA"}
    </Button>
  );
};

export default LanguageSwitcher;
