"use client";
import { useState } from "react";
import Script from "next/script";

// ✅ 간단한 타입 정의
declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

const AdSenseBanner = () => {
    const [error, setError] = useState<string | null>(null);

    const handleAdLoad = () => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense Error", e);
            setError("광고 로드 중 오류가 발생했습니다");
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-[250px]">
            <Script
                id="adsense-init"
                async
                strategy="lazyOnload"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7091520493336042"
                crossOrigin="anonymous"
                onLoad={handleAdLoad}
                onError={() => setError("광고 스크립트 로드 실패")}
            />
            <div className="flex justify-center w-full">
                <ins
                    className="adsbygoogle"
                    style={{ display: "block", width: "100%", height: "250px" }}
                    data-ad-client="ca-pub-7091520493336042"
                    data-ad-slot="2241320809"
                    data-ad-format="autorelaxed"
                />
            </div>
            {error && <div className="text-sm text-gray-500 mt-2">{error}</div>}
        </div>
    );
};

export default AdSenseBanner;
