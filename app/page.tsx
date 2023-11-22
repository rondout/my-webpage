import { Metadata } from "next";
import RootLayout from "./layout";

export const metadata: Metadata = {
  title: "Index page",
  description: "Generated by create next app",
};

export default function Home() {
  return <h1>this is page.tsx</h1>;
}
