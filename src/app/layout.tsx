import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import RegisterServiceWorker from "./components/_components/RegisterServiceWorker";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// ✅ SEO + PWA metadata 설정은 export로 분리
export const metadata: Metadata = {
    title: "점심뭐먹지 - 메뉴 고민 끝! 랜덤 점심 메뉴 추천",
    description:
        "오늘 점심 뭐 먹지? 한식, 중식, 일식, 양식, 분식 등 다양한 메뉴를 랜덤으로 추천해드립니다. 필터 기능으로 원하는 종류의 음식만 골라보세요!",
    keywords:
        "점심메뉴추천,점심추천,메뉴추천,랜덤메뉴,한식,중식,일식,양식,분식,점심고민",
    authors: [{ name: "점심뭐먹지" }],
    creator: "점심뭐먹지",
    publisher: "점심뭐먹지",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: "점심 뭐먹지 - 랜덤 메뉴 추천",
        description: "메뉴 고민 그만! 점심메뉴 랜덤 추천기",
        url: "https://lunchmenu-one.vercel.app",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "점심 뭐먹지 랜덤 추천",
            },
        ],
        locale: "ko_KR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "점심 뭐먹지 - 랜덤 메뉴 추천",
        description: "메뉴 고민 그만! 점심메뉴 랜덤 추천기",
        images: ["/og-image.png"],
    },
    other: {
        "google-site-verification":
            "MZlxuQbZ_9eN6ZNus4JoJMkdu8vZr_Sy5SlGaeu3DFo",
        "google-adsense-account": "ca-pub-7091520493336042",
        "naver-site-verification": "", // 네이버 서치어드바이저 인증 코드
    },
};

// ✅ viewport도 따로 분리해야 경고 안 남
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {/* ✅ PWA Service Worker */}
                <RegisterServiceWorker />

                {/* ✅ 카카오 SDK */}
                <Script
                    src="https://developers.kakao.com/sdk/js/kakao.js"
                    strategy="beforeInteractive"
                />

                {/* ✅ Google AdSense 스크립트 */}
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7091520493336042"
                    strategy="afterInteractive"
                    crossOrigin="anonymous"
                />

                <div className="w-full max-w-[480px] mx-auto min-h-screen bg-white">
                    {children}
                </div>
            </body>
        </html>
    );
}
// d
