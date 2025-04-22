"use client";
import { useEffect } from "react";
import Script from "next/script";

// ✅ 타입 선언으로 TypeScript 에러 방지
declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

const AdSenseBanner = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense Error", e);
        }
    }, []);

    return (
        <>
            <Script
                id="adsense-init"
                async
                strategy="afterInteractive"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7091520493336042"
                crossOrigin="anonymous"
            />
            <ins
                className="adsbygoogle"
                style={{ display: "block", width: "100%", height: "250px" }}
                data-ad-client="ca-pub-7091520493336042"
                data-ad-slot="2241320809"
                data-ad-format="autorelaxed"
            ></ins>
        </>
    );
};

export default AdSenseBanner;
