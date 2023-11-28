import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import MatDialog, { MatDialogProps } from "./MatDialog";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { useCallback, useEffect, useState } from "react";
import { dataURLtoFile } from "../../../utils";
import { nanoid } from "nanoid";

export enum CropImgType {
  // 圆形
  CIRCLE,
  // 矩形
  RECTANGLE,
}

interface CropImageDialogProps extends MatDialogProps {
  file: string;
  onOk(file: File): Promise<any>;
  ratio?: number;
  cropType?: CropImgType;
}

export function CropImageDialog(props: CropImageDialogProps) {
  const { t } = useTranslation();
  const [cropper, setCropper] = useState<any>();
  const { cropType = CropImgType.RECTANGLE, ratio = 3 } = props;

  const imgWidth = cropType === CropImgType.CIRCLE ? 360 : 480;

  // 圆形还是矩形
  const containerClassName = cropType === CropImgType.CIRCLE ? "edit-img-container-circle" : "edit-img-container-rectangle";

  const onOk = () => {
    const canvasUrl: string = cropper.getCroppedCanvas().toDataURL();
    const file = dataURLtoFile(canvasUrl, "image" + nanoid() + ".png");
    // 返回父级的上传方法的返回值（Promise）交给MatDialog组件自己去改变按钮的loading状态以及自动关闭Dialog
    return props.onOk(file);
  };

  const onClose = () => {
    setCropper(null);
    props.onClose();
  };

  const initCropper = useCallback(() => {
    Promise.resolve().then(() => {
      const img = document.querySelector("." + containerClassName + " > img");
      if (!img || !props.open || cropper) {
        return;
      }
      const myCropper = new Cropper(document.querySelector("." + containerClassName + " > img"), {
        dragMode: "none",
        aspectRatio: ratio,
        viewMode: 1,
      });
      setCropper(myCropper);
    });
  }, [cropper, props.open, containerClassName, ratio]);

  useEffect(() => {
    if (cropper && !props.open) {
      setCropper(null);
    }
  }, [props.open, cropper]);

  useEffect(() => {
    initCropper();
  }, [initCropper]);

  return (
    <MatDialog title={props.title} open={props.open} onOk={onOk} onClose={onClose}>
      <Box>
        <Typography sx={{ mt: 0, mb: 2 }}>{t("user.adjustByDrag")}</Typography>
        <Box className={containerClassName + " flex"} sx={{ width: imgWidth, height: 360, margin: "0 auto", overflow: "hidden" }}>
          <img width={imgWidth} style={{ maxWidth: "100%" }} id="image" src={props.file} alt="" />
        </Box>
      </Box>
    </MatDialog>
  );
}
