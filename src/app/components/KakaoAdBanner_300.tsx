"use client";
import { useEffect, useState } from "react";

// ✅ 카카오 광고 SDK 타입 정의
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
    // 에러 상태 관리
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const scriptId = "kakao-ad-script";

        try {
            // 스크립트가 없는 경우에만 추가
            if (!document.getElementById(scriptId)) {
                const script = document.createElement("script");
                script.id = scriptId;
                script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
                script.async = true;
                script.onerror = () => setError("광고 스크립트 로드 실패");
                document.body.appendChild(script);
            } else if (window.kakao?.adfit?.reload) {
                // 이미 로드된 경우 새로고침
                window.kakao.adfit.reload();
            }
        } catch (e) {
            console.error("Kakao Ad Error:", e);
            setError("광고 로드 중 오류 발생");
        }
    }, []);

    return (
        // 최소 높이를 지정하여 광고 로드 전 레이아웃 시프트 방지
        <div className="flex justify-center items-center min-h-[250px]">
            <div className="w-[300px] h-[250px]">
                <ins
                    className="kakao_ad_area"
                    style={{ display: "block" }}
                    data-ad-unit="DAN-Fw9lyc7uVeN2Du0J"
                    data-ad-width="300"
                    data-ad-height="250"
                />
            </div>
            {/* 에러 메시지 표시 */}
            {error && <div className="text-sm text-gray-500 mt-2">{error}</div>}
        </div>
    );
};

export default KakaoAdBanner_300;
