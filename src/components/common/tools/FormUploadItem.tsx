import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, Theme, Tooltip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { t } from "i18next";
import { ChangeEvent, useState } from "react";
import fileController from "../../../controllers/file.controller";
import { MatFormItemProps } from "../../../models/base.model";
import { ContentFile, FileBizType, FileType, parseFileFormat } from "../../../models/fileManage.model";
import { CropImageDialog } from "./CropImageDialog";
import Iconfont from "./Iconfont";
import WallpaperPreviewDialog from "./WallpaperPreviewDialog";

const useStyles = makeStyles((theme: Theme) => {
  return {
    valueContainer: {
      height: 40,
      borderRadius: 4,
      borderColor: theme.palette.grey[500],
      boxSizing: "border-box",
      overflow: "hidden",
      width: 300,
      minWidth: 300,
    },
    uploadBtn: {
      backgroundColor: theme.palette.grey[200],
      height: "100%",
      padding: 8,
      cursor: "pointer",
    },
  };
});

export interface FormUploadItemProps extends MatFormItemProps<ContentFile> {
  file: ContentFile;
  cropDialogTitle?: string;
  fileType?: FileType;
  accept?: string;
  verticleLabel?: boolean;
  autoWidth?: boolean;
  labelWidth?: number;
}

export default function FormUploadItem(props: FormUploadItemProps) {
  const classes = useStyles();

  const { verticleLabel, autoWidth, fileType = FileType.IMAGE } = props;

  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [preViewOpen, setPreViewOpen] = useState(false);

  const closePreviewDialog = () => {
    setPreViewOpen(false);
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShow(false);
    const file = event.target.files[0];
    // 如果上传的不是图片 就不需要裁剪直接上传即可
    if (fileType !== FileType.IMAGE) {
      uploadFile(file);
    } else {
      setFileUrl(URL.createObjectURL(file));
      setCropDialogOpen(true);
      // 如果上传的是图片文件 则应该打开裁剪框
    }
    // 通过控制show变量来加载和卸载上传文件这个input元素 否则会导致两次上传同一个文件的时候第二次不会触发文件input元素的onChange事件
    Promise.resolve().then(() => setShow(true));
  };

  const onCropFileOk = (file: File): Promise<any> => {
    return uploadFile(file);
  };

  const closeCropDialog = () => {
    setCropDialogOpen(false);
  };

  const uploadFile = (file: File) => {
    setLoading(true);
    const fileData = new FormData();
    const { name, size } = file;
    fileData.append("file", file);
    fileData.append("fileType", parseFileFormat(name));
    fileData.append("bizType", FileBizType.TEMPORARY);
    fileData.append("name", name);
    fileData.append("fileSize", size + "");

    const result = fileController.uploadFile(fileData);
    result
      .then((res) => {
        props.onChange(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    return result;
  };

  const onPreviewClick = () => {
    setPreViewOpen(true);
  };

  const title = props.file?.name;

  return (
    <FormControl className="flex-wrap flex-start" sx={{ flexDirection: verticleLabel ? "column" : "row", alignItems: verticleLabel ? "flex-start" : "center" }} fullWidth>
      {props.label && <Typography sx={{ mr: 2, width: props.labelWidth }}>{t(props.label)}</Typography>}
      <Box className="flex-start" sx={{ minWidth: autoWidth ? 0 : 360, flexWrap: "nowrap" }}>
        <Box className={classes.valueContainer + " flex-between"} sx={{ borderRadius: 1, border: "1px solid #bbbec2", pl: 2, minWidth: autoWidth ? 100 : 330, maxWidth: 1 / 1 }}>
          <Tooltip title={title || ""}>
            <Typography className="line-clamp" sx={{ overflow: "hidden" }}>
              {title}
            </Typography>
          </Tooltip>
          {loading && <LoadingButton loading></LoadingButton>}
          {!loading && (
            <label htmlFor={props.name}>
              <Box className={classes.uploadBtn + " flex"}>
                <Iconfont icon="ic_upload1"></Iconfont>
                <Typography variant="subtitle1" sx={{ whiteSpace: "nowrap", pr: 2 }}>{t("common.upload")}</Typography>
              </Box>
              {show && <input accept={props.accept} onChange={onFileChange} style={{ display: "none" }} type="file" id={props.name} />}
            </label>
          )}
          {/* 预览 */}
        </Box>
        {Boolean(props.file) && (
          <Button sx={{ ml: 0.5 }} onClick={onPreviewClick} variant="text">
            {t("device.preview")}
          </Button>
        )}
      </Box>
      <CropImageDialog ratio={10 / 15} title={props.cropDialogTitle} file={fileUrl} open={cropDialogOpen} onOk={onCropFileOk} onClose={closeCropDialog}></CropImageDialog>
      <WallpaperPreviewDialog open={preViewOpen} onClose={closePreviewDialog} imageUrl={props.file?.filePathHttps}></WallpaperPreviewDialog>
    </FormControl>
  );
}
