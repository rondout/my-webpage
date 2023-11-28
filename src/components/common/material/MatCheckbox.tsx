import { FormControlLabel, FormControl } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { MatFormItemProps } from "../../../models/base.model";
import { t } from "i18next";

export interface MatCheckboxProps extends MatFormItemProps<boolean> {}

export default function MatCheckbox(props: MatCheckboxProps) {
  return (
    <FormControl sx={{ height: 1 / 1, display: "flex", justifyContent: "center", ...(props.sx || {}) }}>
      <FormControlLabel
        control={<Checkbox disabled={props.disabled} onBlur={props.onBlur} name={props.name} onChange={props.onChange} checked={props.value || false} />}
        label={t(props.label) as string}
      />
    </FormControl>
  );
}
