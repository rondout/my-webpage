import { FormControl, SxProps, TextField } from "@mui/material";
import { Languages, MatFormItemProps } from "../../../models/base.model";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import enLocale from "date-fns/locale/en-US";
import zhLocale from "date-fns/locale/zh-CN";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { isNull } from "../../../utils";
import { Locale } from "date-fns";
import { selectLanguage } from "../../../store/selectors";
import { useSelector } from "react-redux";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

interface MatDatePickerProps extends MatFormItemProps<string | number> {
  sx?: SxProps;
  staticMode?: boolean;
  fullWidth?: boolean;
}

const localeMap = new Map<Languages, Locale>([
  [Languages.zh, zhLocale],
  [Languages.en, enLocale],
  [undefined, enLocale],
]);

export default memo(function MatDatePicker(props: MatDatePickerProps) {
  const { width, fullWidth = true, sx = {}, staticMode } = props;
  const { t } = useTranslation();
  const [value, setValue] = useState<Date | null>(isNull(props.value) ? null : new Date(props.value));

  const language = useSelector(selectLanguage);

  const onValueChange = (newValue: Date) => {
    setValue(newValue);
    props.onChange && props.onChange(new Date(newValue).valueOf());
  };

  return (
    <FormControl sx={{ maxWidth: width || 1 / 1, ...sx }} fullWidth={fullWidth}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap.get(language)}>
        {!staticMode && <DatePicker label={t(props.label)} value={value} onChange={onValueChange} renderInput={(params) => <TextField {...params} error={props.error} size="small" />} />}
        {staticMode && <StaticDatePicker displayStaticWrapperAs="desktop" value={value} onChange={onValueChange} renderInput={(params) => <TextField {...params} />} />}
      </LocalizationProvider>
    </FormControl>
  );
});
