"use client";
import { useEffect } from "react";

declare global {
    interface Window {
        kakao?: {
            adfit: {
                reload: () => void;
            };
        };
    }
}

const KakaoAdBanner_250 = () => {
    useEffect(() => {
        const scriptId = "kakao-ad-script";

        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
            script.async = true;
            document.body.appendChild(script);
        } else if (window.kakao?.adfit?.reload) {
            window.kakao.adfit.reload(); // ✅ 함수 호출이므로 no-unused-expressions 해결
        }
    }, []);

    return (
        <div className="w-[250px] h-[250px]">
            <ins
                className="kakao_ad_area"
                style={{ display: "block" }}
                data-ad-unit="DAN-G25FYddwjiWGrans"
                data-ad-width="250"
                data-ad-height="250"
            ></ins>
        </div>
    );
};

export default KakaoAdBanner_250;
