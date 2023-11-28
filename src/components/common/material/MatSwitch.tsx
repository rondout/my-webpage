import * as React from "react";
import FormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { MatFormItemProps } from "../../../models/base.model";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
import Iconfont from "../tools/Iconfont";

export interface MatSwitchProps extends MatFormItemProps<boolean> {
  labelplacement?: FormControlLabelProps["labelPlacement"];
  tip?: string;
}

export default React.memo(function MatSwitch(props: MatSwitchProps) {
  const { t } = useTranslation();
  const { sx = {} } = props;

  const renderLabel = () => {
    if (props.tip) {
      return (
        <span className="flex">
          {t(props.label)}
          <Tooltip title={t(props.tip)} sx={{ ml: 2, mt: 0.5 }}>
            <span style={{ paddingLeft: 8 }}>
              <Iconfont color="#f3a15d" icon={"ic_alert"} fontSize={16} mr={1}></Iconfont>
            </span>
          </Tooltip>
        </span>
      );
    } else {
      return t(props.label);
    }
  };

  return <FormControlLabel sx={sx} labelPlacement={props.labelplacement || "end"} control={<Switch checked={props.value} {...props} />} label={renderLabel()} />;
});
