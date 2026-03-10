import AuthInitializer from "@/components/providers/AuthInitializer";
import StoreProvider from "@/components/providers/StoreProvider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SUST EEE Alumni",
  description:
    "Department of Electrical and Electronic Engineering, Shahjalal University of Science and Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased flex flex-col min-h-screen`}
      >
        <StoreProvider>
          <AuthInitializer>{children}</AuthInitializer>
        </StoreProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
