'use client';
import { WebAppDataProvider } from "@/utils/web-app-provider";
import "./globals.scss";
import AppLayout from "./app-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  


  return (
    <html lang="en">
      <body>
        <WebAppDataProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </WebAppDataProvider>
      </body>
    </html>
  );
}
