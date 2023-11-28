import { alpha, Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../../../assets/imgs/not_found.svg";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToHome = () => navigate("/");

  return (
    <Box className="flex" sx={{ height: 1 / 1, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06), flexDirection: "column" }}>
      <Box sx={{ maxWidth: 480 }}>
        <img style={{ width: "100%" }} src={notFoundImg} alt="" />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography textAlign="center" variant="h3" sx={{ mt: 6, mb: 3 }} fontWeight={700}>
          Oops...
        </Typography>
        <Typography textAlign="center" variant="h4">
          It looks like you're lost
        </Typography>
        <Button sx={{mt: 6}} variant="contained" onClick={navigateToHome}>{t("common.backHome")}</Button>
      </Box>
    </Box>
  );
};

export default NotFound;
