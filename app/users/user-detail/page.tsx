import { Slider } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User detail page",
  description: "this is description",
};

export default function UserDetailPage() {
  return (
    <div>
      <Slider value={15}></Slider>
      <h4>This is USER DETAIL page</h4>;
    </div>
  );
}
