import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { selectConfirmConfig } from "../../../store/selectors";
import { closeConfirmAction } from "../../../store/actions/tools.action";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import Iconfont from "../tools/Iconfont";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => ({
  warningIcon: {
    paddingTop: "42px",
    "& i": {
      height: "24px",
      lineHeight: "1",
      color: "orange",
      fontSize: "32px !important",
      marginLeft: "24px",
    },
  },
}));

export default function MatConfirm() {
  const config = useSelector(selectConfirmConfig);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();
  const classes = useStyle();

  const handleClose = () => {
    if (config.onCancel) {
      config.onCancel();
    }
    setLoading(false);
    dispatch(closeConfirmAction());
  };

  const handleOk = () => {
    if (config.onOk) {
      const re = config.onOk();
      if (re instanceof Promise) {
        setLoading(true);
        re.then(() => {
          handleClose();
          setLoading(false);
        }).catch(() => {
          setLoading(false);
        });
      } else {
        handleClose();
      }
    } else {
      handleClose();
    }
  };

  const okBtnVariant = config.okBtnColor === "error" ? "text" : "contained";

  return (
    <Box>
      <Dialog open={config.open || false} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <Box sx={{ display: "flex" }}>
          {config.showWarningIcon && (
            <Box className={classes.warningIcon}>
              <Iconfont mr={0} icon="ic_alert"></Iconfont>
            </Box>
          )}
          <Box>
            <DialogTitle sx={{ pr: 8 }} id="alert-dialog-title">
              {t(config.title) as string}
            </DialogTitle>
            <DialogContent>{config.customContent ? config.content : <DialogContentText id="alert-dialog-description">{t(config.content as string)}</DialogContentText>}</DialogContent>
            <DialogActions>
              {config.showCancelButton && <Button onClick={handleClose}>{t(config.cancelText || "common.cancel")}</Button>}
              <LoadingButton disabled={config.okBtnDisabled} variant={okBtnVariant} loading={loading} onClick={handleOk} autoFocus color={config.okBtnColor || "primary"}>
                <span>{t(config.okText || "common.confirm")}</span>
              </LoadingButton>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
