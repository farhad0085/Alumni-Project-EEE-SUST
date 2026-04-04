import AuthInitializer from "@/components/providers/AuthInitializer";
import StoreProvider from "@/components/providers/StoreProvider";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "SUST EEE Alumni",
    template: "%s",
  },
  description:
    "Official portal of the Department of Electrical and Electronic Engineering, Shahjalal University of Science and Technology (SUST). Connect with alumni, explore events, faculty profiles, research labs, and more.",
  keywords: [
    "SUST",
    "EEE",
    "alumni",
    "Shahjalal University",
    "electrical engineering",
    "electronic engineering",
    "Bangladesh",
  ],
  authors: [{ name: "SUST EEE Department" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SUST EEE Alumni",
    title: "SUST EEE Alumni Portal",
    description:
      "Official portal of the Dept. of EEE, Shahjalal University of Science and Technology.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUST EEE Alumni Portal",
    description:
      "Official portal of the Dept. of EEE, Shahjalal University of Science and Technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${inter.variable} antialiased flex flex-col min-h-screen`}
      >
        <StoreProvider>
          <AuthInitializer>{children}</AuthInitializer>
        </StoreProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
