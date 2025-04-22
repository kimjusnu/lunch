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

const KakaoAdBanner_300 = () => {
    useEffect(() => {
        const scriptId = "kakao-ad-script";

        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
            script.async = true;
            document.body.appendChild(script);
        } else if (window.kakao?.adfit?.reload) {
            window.kakao.adfit.reload();
        }
    }, []);

    return (
        <div className="w-[300px] h-[250px]">
            <ins
                className="kakao_ad_area"
                style={{ display: "block" }}
                data-ad-unit="DAN-Fw9lyc7uVeN2Du0J"
                data-ad-width="300"
                data-ad-height="250"
            ></ins>
        </div>
    );
};

export default KakaoAdBanner_300;
