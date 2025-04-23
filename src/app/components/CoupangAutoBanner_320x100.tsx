"use client";
import { useEffect, useRef } from "react";

const CoupangAutoBanner_320x100 = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://ads-partners.coupang.com/g.js";
        script.async = true;
        document.body.appendChild(script);

        // 쿠팡 위젯 실행 (DOM이 있는 후에!)
        script.onload = () => {
            try {
                // @ts-expect-error 쿠팡 글로벌 객체
                new window.PartnersCoupang.G({
                    id: 858901,
                    template: "carousel",
                    trackingCode: "AF1075211",
                    width: "360",
                    height: "100",
                    tsource: "",
                });
            } catch (e) {
                console.warn("쿠팡 광고 로드 실패", e);
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            id="coupang-root"
            className="w-[320px] h-[100px]"
        />
    );
};

export default CoupangAutoBanner_320x100;
