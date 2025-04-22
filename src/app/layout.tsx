import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // ✅ 이거 import 필요!
import Head from "next/head";
import RegisterServiceWorker from "./components/_components/RegisterServiceWorker";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "점심뭐먹지",
    description: "오늘 점심 뭐 먹을지 추천해드립니다!",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <Head>
                <meta
                    name="google-site-verification"
                    content="MZlxuQbZ_9eN6ZNus4JoJMkdu8vZr_Sy5SlGaeu3DFo"
                />
                <meta name="theme-color" content="#FCB454" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
                <meta
                    name="google-adsense-account"
                    content="ca-pub-7091520493336042"
                ></meta>

                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7091520493336042"
                    crossOrigin="anonymous"
                ></script>
            </Head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {/* ✅ Service Worker 등록 */}
                <RegisterServiceWorker />

                {/* ✅ 카카오 SDK Script (SSR-safe) */}
                <Script
                    src="https://developers.kakao.com/sdk/js/kakao.js"
                    strategy="beforeInteractive"
                />
                <div className="w-full max-w-[480px] mx-auto min-h-screen bg-white">
                    {children}
                </div>
            </body>
        </html>
    );
}
