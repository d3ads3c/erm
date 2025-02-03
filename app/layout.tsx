import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bakh = localFont({
  src: [
    {
      path: "./fonts/Yekan-Bakh-Fat.woff",
      weight: "900",
      style: "black",
    },
    {
      path: "./fonts/Yekan-Bakh-Bold.woff",
      weight: "700",

      style: "bold",
    },
    {
      path: "./fonts/Yekan-Bakh-Medium.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Yekan-Bakh-Regular.woff",
      weight: "200",
      style: "light",
    },
  ],
});

export const metadata: Metadata = {
  title: "پنل مدیریت کسب و کار آرمان آپس",
  description: "راه حلی نوین با تکنولوژی های روز برنامه نویسی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="">
      <body className={`${bakh.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
