import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Box, SxProps } from "@mui/system";
import { MatFormItemProps } from "../../../models/base.model";
import { useTranslation } from "react-i18next";
import { FormLabel } from "@mui/material";
import MessageTip from "../../regist-template/options/MessageTip";
import { ReactElement } from "react";

export interface MatRadioOption<T> {
  label: string;
  value: T;
  tip?: string;
  customRender?: ReactElement;
}

export interface MatRadioProps<T> extends MatFormItemProps<T> {
  options: MatRadioOption<T>[];
  row?: boolean;
  labelwidth?: number;
  optionlabelwidth?: number | "auto";
  labelSx?: SxProps;
}

export default function MatRadioGroup<T>(props: MatRadioProps<T>) {
  const { t } = useTranslation();
  const { row = true, sx = {}, labelSx = {} } = props;

  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: row ? "center" : "",
        flexWrap: "wrap",
        ...sx,
      }}
    >
      <Box sx={{ width: props.labelwidth || 160, ...labelSx }}>
        <FormLabel sx={{ lineHeight: "36px" }}>{t(props.label)}</FormLabel>
      </Box>
      <RadioGroup onChange={props.onChange} value={props.value} row={row} name={props.name}>
        {props.options.map((option, index) => (
          <Box key={index} className="flex-start flex-wrap">
            <FormControlLabel
              sx={{ width: props.optionlabelwidth || 250 }}
              value={option.value}
              control={<Radio disabled={props.disabled} />}
              label={option.customRender || (t(option.label) as string)}
            />
            {option.tip && <MessageTip content={option.tip}></MessageTip>}
          </Box>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
