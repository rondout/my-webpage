import { LoadingButton } from "@mui/lab";
import { ButtonProps } from "@mui/material";
import { styled } from "@mui/styles";
import { t } from "i18next";
import { nanoid } from "nanoid";
import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from "react";

export interface UploadButtonProps extends ButtonProps {
  loading?: boolean;
  title?: string;
  accept?: string;
  onFileChange(e: FileList): void;
  customedContent?: ReactNode;
}

const Input = styled("input")({
  display: "none",
});

let isMounted = true;

export default function UploadButton(props: UploadButtonProps) {
  isMounted = true;
  const [show, setShow] = useState(true);
  const htmlId = useMemo(() => nanoid(), []);
  // 这里每次文件选择完成后需要卸载input元素  再重新挂载到dom  因为如果不这样做 下次选择用一个文件是无法发生任何响应的
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShow(false);
    props.onFileChange(e.target.files);
    Promise.resolve().then(() => {
      if (isMounted) {
        setShow(true);
      }
    });
  };

  useEffect(
    () => () => {
      isMounted = false;
    },
    []
  );

  return (
    <label htmlFor={"contained-button-file" + htmlId}>
      {show && <Input multiple disabled={props.loading} accept={props.accept || "*"} id={"contained-button-file" + htmlId} onChange={onChange} type="file" />}
      {props.customedContent || (
        <LoadingButton loading={props.loading} sx={props.sx} variant={props.variant} component="span">
          {props.children || t("common.upload")}
        </LoadingButton>
      )}
    </label>
  );
}
