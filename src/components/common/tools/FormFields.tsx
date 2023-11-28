import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";

export default function FormFields() {
  return (
    <Box sx={{ width: 1 / 1 }}>
      <span>111</span>
      <Outlet></Outlet>
    </Box>
  );
}
