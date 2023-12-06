import "@poku/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@poku/trpc/react";
import SimpleHeader from "@poku/components/header/simple-header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Pokemon Next",
  description: "Pokemon Next",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} overflow-x-hidden`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <SimpleHeader />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
