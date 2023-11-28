import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingBackdropProps {
  open: boolean;
}

export default function LoadingBackdrop(props: LoadingBackdropProps) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={props.open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
