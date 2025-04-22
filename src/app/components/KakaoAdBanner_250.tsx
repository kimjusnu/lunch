// components/KakaoAdBanner_250.tsx
"use client";
import { useEffect } from "react";

const KakaoAdBanner_250 = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <ins
            className="kakao_ad_area"
            style={{ display: "none" }}
            data-ad-unit="DAN-G25FYddwjiWGrans"
            data-ad-width="250"
            data-ad-height="250"
        ></ins>
    );
};

export default KakaoAdBanner_250;
