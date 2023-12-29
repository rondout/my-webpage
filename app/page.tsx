import { Box } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";
import CounterControl from "@/src/components/counter/CounterControl";

export const metadata: Metadata = {
  title: "Index page",
  description: "Generated by create next app",
};

export default function Home() {
  return (
    <Box className="content-item">
      <h1>this is page.tsx</h1>
      <CounterControl />
      <Link href="/users">Users</Link>
    </Box>
  );
}
