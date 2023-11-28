import { Box, CircularProgress, SxProps } from "@mui/material";
import { Fragment, ReactNode } from "react";
import "./loading.scss";

// const useStyles = makeStyles((theme: Theme) => {
//   return {
//     content: {
//       backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
//     },
//   };
// });

type LoadingSize = "small" | "medium" | "large";

interface CommonLoadingProps {
  size?: LoadingSize;
  title?: string;
  children?: ReactNode;
  loading?: boolean;
  sx?: SxProps;
}

const loadingStyleMap = new Map<LoadingSize, number>([
  ["small", 40],
  ["medium", 50],
  ["large", 60],
]);

export default function CommonLoading(props: CommonLoadingProps) {
  // const classes = useStyles();

  const { size = "medium", loading = true, title = "loading...", sx = {} } = props;

  return (
    // <Box sx={{ minHeight: 1 / 1, boxSizing: "border-box", ...sx }}>
    <Fragment>
      {loading && (
        <Box sx={{ height: 1 / 1, flexDirection: "column", ...sx }} className="flex">
          {/* <Box className={classes.content + " loading-icon flex"} sx={{ height: sx.outer, width: sx.outer }}>
            <Box className="loading-inner" sx={{ height: sx.inner, width: sx.inner }}></Box>
            </Box>
          <span className="loading-text">{props.title || "loading..."}</span> */}
          <CircularProgress sx={{ mb: 1 }} size={loadingStyleMap.get(size)} />
          <span className="loading-text">{title}</span>
        </Box>
      )}
      {props.children}
    </Fragment>
  );
}
