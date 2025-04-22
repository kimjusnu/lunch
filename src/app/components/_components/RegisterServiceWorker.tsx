"use client";

import { useEffect } from "react";

const RegisterServiceWorker = () => {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then(reg => console.log("✅ Service Worker 등록 성공:", reg))
                .catch(err => console.error("❌ 등록 실패:", err));
        }
    }, []);

    return null; // UI 없이 등록만
};

export default RegisterServiceWorker;
