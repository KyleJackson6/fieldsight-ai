import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FieldSight AI",
  description: "AI-powered field analysis for modern farmers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#0a0f0d]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#0a0f0d] text-gray-100 min-h-screen flex flex-col`}
      >
        <Providers>
          {children}

          {/* Google Analytics */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        </Providers>
      </body>
    </html>
  );
}