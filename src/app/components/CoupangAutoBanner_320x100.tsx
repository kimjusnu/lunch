"use client";
import { useEffect } from "react";

const CoupangAutoBanner_320x100 = () => {
    useEffect(() => {
        // 외부 스크립트 삽입
        const script1 = document.createElement("script");
        script1.src = "https://ads-partners.coupang.com/g.js";
        script1.async = true;
        document.body.appendChild(script1);

        // 쿠팡 위젯 삽입
        const script2 = document.createElement("script");
        script2.innerHTML = `
            new PartnersCoupang.G({
                id: 858901,
                template: "carousel",
                trackingCode: "AF1075211",
                width: "320",
                height: "100",
                tsource: ""
            });
        `;
        document.body.appendChild(script2);

        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        };
    }, []);

    return null;
};

export default CoupangAutoBanner_320x100;
