import { Box, Dialog, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Iconfont from "./Iconfont";
import androidSimulator from "../../../assets/imgs/android_simulator.svg";
import { MatDialogProps } from "./MatDialog";

const useStyle = makeStyles((theme: Theme) => {
  return {
    container: {
      height: 456,
      maxWidth: 310,
      width: "100%",
      margin: "auto",
      boxSizing: "border-box",
      borderRadius: 24,
      position: "relative",
      backgroundImage: `url(${androidSimulator})`,
      backgroundSize: "cover",
    },
    content: {
      // borderRadius: 8,
      top: 53,
      left: 47,
      width: 214,
      height: 334,
      position: "absolute",
      backgroundSize: "cover",
      backgroundImage: "url()",
    },
    closeContainer: {
      position: "absolute",
      top: -12,
      right: -32,
      cursor: "pointer",
    },
  };
});

const defaultBackground = "https://pre-mdm.bluesphere.cloud:9443/bb5e8930-fd74-11ea-b671-59e50c88e582/content/2022/5/11/9da09320-a05a-452a-996a-e200cf9b2c5a/imageuWLsE3HwRz6z_yLOkSpOe.png";

interface WallPaperPreviewProps extends MatDialogProps {
  imageUrl: string;
}

export default function WallpaperPreviewDialog(props: WallPaperPreviewProps) {
  const { imageUrl = defaultBackground } = props;
  const classes = useStyle();

  const backgroundImage = `url(${imageUrl})`;

  const onClose = () => {
    props.onClose();
  };
  return (
    <Dialog PaperProps={{ sx: { bgcolor: "transparent", boxShadow: "none", width: 1 / 1, overflow: "visible" } }} open={props.open} onClose={onClose}>
      <Box sx={{ height: { sm: 616 }, maxWidth: { sm: 420 } }} className={classes.container}>
        <Box sx={{ top: { sm: 71 }, left: { sm: 63 }, width: { sm: 289 }, height: { sm: 451 }, backgroundImage }} className={classes.content}></Box>
        <Box onClick={onClose} className={classes.closeContainer}>
          <Iconfont icon="ic_dialog_close" color="#fff"></Iconfont>
        </Box>
      </Box>
    </Dialog>
  );
}
