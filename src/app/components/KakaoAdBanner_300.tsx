"use client";
import { useEffect, useState } from "react";

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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const scriptId = "kakao-ad-script";

        try {
            if (!document.getElementById(scriptId)) {
                const script = document.createElement("script");
                script.id = scriptId;
                script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
                script.async = true;
                script.onerror = () => setError("광고 스크립트 로드 실패");
                document.body.appendChild(script);
            } else if (window.kakao?.adfit?.reload) {
                window.kakao.adfit.reload();
            }
        } catch (e) {
            console.error("Kakao Ad Error:", e);
            setError("광고 로드 중 오류 발생");
        }
    }, []);

    return (
        <div className="flex justify-center items-center min-h-[250px] relative">
            <div className="w-[300px] h-[250px]">
                <ins
                    className="kakao_ad_area"
                    style={{ display: "block" }}
                    data-ad-unit="DAN-Fw9lyc7uVeN2Du0J"
                    data-ad-width="300"
                    data-ad-height="250"
                />
            </div>
            {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
        </div>
    );
};

export default KakaoAdBanner_300;
