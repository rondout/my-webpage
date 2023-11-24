// "use client";
import { StyledDiv } from "@/components/layout/StyledDiv";
import LoginButton from "@/components/users/LoginButton";
import { Slider, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Child",
};

async function getData() {
  const data = await Promise.resolve("test");
  return data;
}

export default async function UserDetailPage() {
  const data = await getData();

  return (
    <div>
      <Slider value={15}></Slider>
      <StyledDiv></StyledDiv>
      <Typography variant="h2">Hello World{data}</Typography>
      <LoginButton />
      <h4>This is USER DETAIL page</h4>;
    </div>
  );
}
