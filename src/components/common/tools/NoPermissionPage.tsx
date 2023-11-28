import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import MatDialog from "./MatDialog";
import { useNavigate } from "react-router-dom";

export default function NoPermissionPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToHome = () => navigate("/");
  return (
    <Box>
      <MatDialog open={true} hideFooter onClose={null} size="sm" title={null}>
        <Box className="flex flex-column">
          <Typography variant="h3">{t("user.noPermissionForThisPage")}</Typography>
          <Button sx={{ mt: 4, mb: 2 }} variant="contained" onClick={navigateToHome}>
            {t("common.backHome")}
          </Button>
        </Box>
      </MatDialog>
    </Box>
  );
}
