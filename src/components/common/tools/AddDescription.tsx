import { Typography } from "@mui/material";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useObSelector } from "../../../hooks/useAuth";
import { $message } from "../../../utils";
import MatInput from "../material/MatInput";
import TextButton from "../material/TextButton";
import Iconfont from "./Iconfont";
import MatDialog from "./MatDialog";

interface AddDescriptionProps {
  value: string;
  onOk(desc: string): Promise<any>;
}

export default function AddDescription(props: AddDescriptionProps) {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const isOb = useObSelector();

  const formik = useFormik({
    initialValues: { desc: "" },
    validationSchema: Yup.object({ desc: Yup.string().required() }),
    validateOnMount: true,
    onSubmit(values) {
      // formik的submit方法只会在校验成功后才被调用
    },
  });

  const openAddDialog = () => {
    setDialogOpen(true);
  };

  const onDialogOk = () => {
    formik.handleSubmit();
    if (formik.isValid) {
      const result = props.onOk(formik.values.desc);
      result
        .then((res) => {
          $message.success("common.addDescSuccessed");
        })
        .catch(() => {
          $message.error("common.addDescFailed");
        });
      return result;
    }
  };

  const onDialogClose = () => {
    formik.resetForm();
    setDialogOpen(false);
  };

  const error = Boolean(formik.touched.desc && formik.errors.desc);

  if (props.value || isOb) {
    return (
      <Typography className="line-clamp">
        {props.value}
      </Typography>
    );
  } else {
    return (
      <Fragment>
        <TextButton size="small" onClick={openAddDialog}>
          <Iconfont primary fontSize={20} icon="ic_add1" mr={0.5}></Iconfont>
          <Typography sx={{ textTransform: "none", pr: 0.5 }} variant="subtitle2" color="primary">
            {t("common.addDesc")}
          </Typography>
        </TextButton>
        <MatDialog open={dialogOpen} onOk={onDialogOk} title="common.addDesc" onClose={onDialogClose}>
          <MatInput rows={3} multiline maxRows={5} label={t("common.description")} {...formik.getFieldProps("desc")} error={error}></MatInput>
        </MatDialog>
      </Fragment>
    );
  }
}
