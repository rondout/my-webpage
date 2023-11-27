import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/app/components/themeRegistry/ThemeRegistry";
import HeaderBar from "@/app/components/layout/HeaderBar";
import { ReduxProvider } from "@/app/store/store";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App11",
  description: "Generated by create next app",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeRegistry>
            <HeaderBar />
            {children}
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}

// export default wrapper.withRedux(RootLayout);
export default RootLayout;
