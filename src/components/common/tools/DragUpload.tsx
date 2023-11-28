import { Box, SxProps, Theme } from "@mui/material";
import { ChangeEvent, InputHTMLAttributes, PropsWithChildren, useState } from "react";

interface DragUploadProps {
  onFileChange: (files: FileList) => void;
  sx?: SxProps<Theme>;
  className?: string;
  accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
}

/**
 * @function React.Component
 * @description 拖动上传文件
 */
export default function DragUpload(props: PropsWithChildren<DragUploadProps>) {
  const { sx = {}, className, accept } = props;
  const [show, setShow] = useState(true);
  //   const [border];

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    handleFile(files);
  };

  const preventDefaultEvent = (e: DragEvent) => {
    e.preventDefault();
    // data.borderColor = "#000";
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    // data.borderColor = store.themeColor;
  };

  const onDrop = (e: DragEvent) => {
    // data.borderColor = "#000";
    e.stopPropagation();
    e.preventDefault();
    const files = e.dataTransfer.files;
    const file = files[0];
    if (!file) {
      return;
    }
    handleFile(files);
  };

  const handleFile = (files: FileList) => {
    setShow(false);
    Promise.resolve().then(() => {
      setShow(true);
    });
    props.onFileChange(files);
    // setTimeout(() => {
    //   setShow(true);
    // }, 0);
  };

  return (
    <label htmlFor="upload-id">
      {/* @ts-ignore */}
      <Box
        onDragLeave={preventDefaultEvent}
        onDragEnter={preventDefaultEvent}
        onDragOver={onDragOver}
        onDrop={onDrop}
        sx={{ borderRadius: 1.5, border: "1px dashed", ...sx }}
        className={"pointer " + className}
      >
        {props.children}
        {show && <input onChange={onFileChange} accept={accept} style={{ display: "none" }} type="file" name="" id="upload-id" />}
      </Box>
    </label>
  );
}
