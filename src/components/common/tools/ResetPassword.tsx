import { useSearchParams } from "react-router-dom";
import { Box, Divider, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import MatPassword from "../material/MatPassword";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { userController } from "../../../controllers/user.controller";
import { $message } from "../../../utils";
import logo from "../../../assets/imgs/logo.svg";
import logoTranslucence from "../../../assets/imgs/logo_translucence.svg";
import { t } from "i18next";
import CustomLink from "../tools/CustomLink";

const currentYear = new Date().getFullYear();

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      height: "100%",
    },
    resetPwdContainer: {
      backgroundColor: theme.custom?.commonBg,
      padding: "32px 32px",
      width: 460,
      borderRadius: 8,
      margin: "0 8px",
    },
    resetPwdTitle: {
      fontWeight: "bold",
      color: theme.palette.primary.main,
      letterSpacing: 1.5,
    },
    translucenceImg: {
      right: -64,
      width: 480,
      bottom: -120,
      position: "absolute",
    },
  };
});

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("resetToken");
  const classes = useStyles();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { password: "", passwordConfirm: "" },
    validateOnMount: true,
    validationSchema: Yup.object({
      password: Yup.string().max(255).min(8, t("user.createAdminErrors.passwordMin8")).required(t("user.createAdminErrors.password")),
      passwordConfirm: Yup.string().max(255).min(8, t("user.createAdminErrors.passwordMin8")).required(t("user.createAdminErrors.passwordConfirm")),
    }),
    onSubmit(values) {
      const { password, passwordConfirm } = values;
      if (password !== passwordConfirm) {
        $message.error("user.passwordNotSame");
        return;
      } else {
        const result = userController.resetPassword({ password, resetToken });
        result
          .then((res) => {
            $message.success("user.resetPwdSuccessedTip");
            navigate("/login");
          })
          .catch((err) => {
            if (err?.data?.message) {
              $message.error(err?.data.message);
            }
          });
        return result;
      }
      // userController;
    },
  });

  const resetPassword = () => {
    formik.handleSubmit();
  };

  const goBack = () => {
    navigate("/login");
  };

  return (
    <Box className="flex" sx={{ height: 1 / 1, flexDirection: "column" }}>
      <Box className="flex-start border-box" sx={{ px: 5, width: 1 / 1, height: 80, bgcolor: "#fff" }}>
        <img width={240} src={logo} alt="" />
      </Box>
      <Box className="flex" sx={{ width: 1 / 1, bgcolor: (theme) => theme.palette.primary.main, flex: 1, position: "relative" }}>
        <Box className={classes.resetPwdContainer + " border-box"}>
          <Typography className={classes.resetPwdTitle} variant="h5">
            {t("user.resetPwdTitle")}
          </Typography>
          <Box sx={{ mt: 5, height: 64 }}>
            <MatPassword
              width={400}
              {...formik.getFieldProps("password")}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              label="user.password"
            ></MatPassword>
          </Box>
          <Box sx={{ height: 64, my: 1 }}>
            <MatPassword
              width={400}
              {...formik.getFieldProps("passwordConfirm")}
              error={Boolean(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
              helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
              label="user.passwordConfirm"
            ></MatPassword>
          </Box>
          <Box className="flex-between">
            <LoadingButton sx={{ mr: 2 }} fullWidth onClick={goBack} variant="contained">
              <span>{t("common.back")}</span>
            </LoadingButton>
            <LoadingButton loading={formik.isSubmitting} fullWidth onClick={resetPassword} variant="contained">
              <span>{t("user.reset")}</span>
            </LoadingButton>
          </Box>
        </Box>
        <img width={460} className={classes.translucenceImg} src={logoTranslucence} alt="" />
      </Box>
      <Box sx={{ width: 1 / 1, height: 64, bgcolor: "#fff" }} className="flex flex-wrap">
        <Typography sx={{ mr: 3 }} variant="subtitle1">
          {"Copyright@" + currentYear + "BlueSphere,Inc."}
        </Typography>
        <CustomLink showUnderline>Privacy statement</CustomLink>
        <Divider orientation="vertical" sx={{ height: 24, mx: 1 }}></Divider>
        <CustomLink showUnderline>Terms of use</CustomLink>
        <Divider orientation="vertical" sx={{ height: 24, mx: 1 }}></Divider>
        <CustomLink showUnderline>All polices and guidelines</CustomLink>
      </Box>
    </Box>
  );
}
