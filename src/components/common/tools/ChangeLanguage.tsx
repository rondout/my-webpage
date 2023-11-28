import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Languages } from "../../../models/base.model";

export default function ChangeLanguage() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;

  const setLang = () => {
    const lang = currentLang === Languages.zh ? Languages.en : Languages.zh;
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };
  return (
    <>
      <Button size="small" onClick={setLang} variant="text">
        {currentLang}
      </Button>
    </>
  );
}
