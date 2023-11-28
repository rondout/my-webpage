import { Box, FormControl, InputAdornment, SxProps, TextField, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomOperationMenu, Languages, MatFormItemProps } from "../../../models/base.model";
import { isNull } from "../../../utils";
import MatDropdown from "../material/MatDropdown";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../../store/selectors";
import countryData, { CountryData } from "../../../utils/countryData";

interface PhoneNumberInputProps {
  country: string;
  onCountryChange(country: string): void;
  inputProps: MatFormItemProps;
  multiline?: boolean;
  maxRows?: number;
  sx?: SxProps;
  fullWidth?: boolean;
}

const createCountrySelectOptions = (lang: Languages): CustomOperationMenu[] => {
  const key: keyof CountryData = lang === Languages.zh ? "name" : "enName";
  const options = countryData.map((v) => {
    return new CustomOperationMenu(v.code, v[key] + " " + v.phonePrefix, <span className={"flag flag-" + v.code}></span>);
  });
  // 中国下面加一个分隔线
  options[2].showDivider = true;
  return options;
};

const useStyle = makeStyles((theme: Theme) => {
  return {
    dropDowbTrigger: {
      padding: "8px 8px",
      marginLeft: "-14px",
      borderRadius: "4px 0 0 4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      borderRight: "1px solid",
      borderRightColor: theme.palette.divider,
    },
    dropdownIcon: {
      border: "6px solid transparent",
      borderTopColor: "#0000008f",
      marginLeft: "8px",
      marginTop: "6px",
    },
  };
});

export default memo(function PhoneNumberInput(props: PhoneNumberInputProps) {
  const { width, size = "small" } = props.inputProps;
  const { fullWidth = true, inputProps, onCountryChange } = props;
  const country = props.country || "us";
  const { t } = useTranslation();
  const value = isNull(inputProps.value) ? "" : inputProps.value;
  const classes = useStyle();
  const [selectedCountry, setSelectedCountry] = useState<string>(country);
  const language = useSelector(selectLanguage);

  const countrySelectOptions = useMemo(() => {
    return createCountrySelectOptions(language);
  }, [language]);

  const onMenuClick = (code: string) => {
    setSelectedCountry(code);
    onCountryChange(code);
  };

  const placeholder = useMemo(() => {
    return countryData.find((v) => v.code === selectedCountry)?.phonePrefix;
  }, [selectedCountry]);

  return (
    <FormControl error={inputProps.error} sx={{ maxWidth: width || 1 / 1 }} fullWidth={fullWidth}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MatDropdown<string>
                sx={{ pl: 0 }}
                trigger={
                  <Box className={classes.dropDowbTrigger}>
                    <Box>
                      <span className={"flag flag-" + selectedCountry}></span>
                    </Box>
                    <Box className={classes.dropdownIcon}></Box>
                  </Box>
                }
                selected={selectedCountry}
                menus={countrySelectOptions}
                onMenuClick={onMenuClick}
              ></MatDropdown>
            </InputAdornment>
          ),
          placeholder,
        }}
        {...inputProps}
        size={size}
        label={inputProps.label && t(inputProps.label)}
        value={value}
      ></TextField>
    </FormControl>
  );
});
