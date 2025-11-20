import type { Metadata } from "next";
import { AppConfig } from "@/utils/appConfig";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "SAPECO - Tinh dầu đuổi muỗi",
  description: "SAPECO - Tinh dầu đuổi muỗi tự nhiên, an toàn và hiệu quả. Bảo vệ gia đình bạn khỏi muỗi với sản phẩm chất lượng cao.",
  icons: [
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={AppConfig.defaultLocale}>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}

