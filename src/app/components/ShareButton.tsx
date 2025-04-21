"use client";

import { useEffect, useState } from "react";
import { Button, Snackbar, Stack } from "@mui/material";
import { Share2, MessageCircleMore } from "lucide-react";

// ✅ Kakao SDK 타입 선언
declare global {
    interface Window {
        Kakao: {
            init: (key: string) => void;
            isInitialized: () => boolean;
            Link: {
                sendDefault: (config: {
                    objectType: "feed";
                    content: {
                        title: string;
                        description: string;
                        imageUrl: string;
                        link: {
                            mobileWebUrl: string;
                            webUrl: string;
                        };
                    };
                    buttons?: {
                        title: string;
                        link: {
                            mobileWebUrl: string;
                            webUrl: string;
                        };
                    }[];
                }) => void;
            };
        };
    }
}

// ✅ 카카오 앱 키 (환경변수로부터 불러옴)
const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY!;

// ✅ Kakao 초기화 함수
const initKakao = () => {
    if (
        typeof window !== "undefined" &&
        window.Kakao &&
        !window.Kakao.isInitialized()
    ) {
        window.Kakao.init(KAKAO_APP_KEY);
    }
};

// ✅ props 정의
interface ShareButtonProps {
    foodName: string;
    message: string;
    imageUrl: string; // e.g. "/pumpkin-salad.svg"
}

// ✅ 컴포넌트 시작
const ShareButton = ({ foodName, message, imageUrl }: ShareButtonProps) => {
    const [toastOpen, setToastOpen] = useState(false);

    // ✅ 실제 공유 텍스트
    const shareText = `오늘 점심은 "${foodName}" 어때요?\n${message}\n👉 메뉴 추천: https://your-app.vercel.app`;

    // ✅ 페이지 로드 시 카카오 SDK 초기화
    useEffect(() => {
        initKakao();
    }, []);

    // ✅ Web Share API or Clipboard fallback
    const handleWebShareOrClipboard = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "오늘 뭐 먹지?",
                    text: shareText,
                    url: window.location.href,
                });
            } catch (err) {
                console.error("공유 취소됨:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareText);
                setToastOpen(true);
            } catch {
                alert("클립보드 복사에 실패했어요.");
            }
        }
    };

    // ✅ Kakao 공유 버튼 클릭 시 처리
    const handleKakaoShare = () => {
        if (!window.Kakao?.isInitialized()) {
            alert("카카오톡 공유 초기화 오류");
            return;
        }

        window.Kakao.Link.sendDefault({
            objectType: "feed",
            content: {
                title: "오늘의 점심 메뉴 🍽️",
                description: message,
                imageUrl: `https://your-app.vercel.app${imageUrl}`, // ✅ 절대 경로로 변환
                link: {
                    webUrl: "https://your-app.vercel.app",
                    mobileWebUrl: "https://your-app.vercel.app",
                },
            },
            buttons: [
                {
                    title: "메뉴 추천 받기",
                    link: {
                        webUrl: "https://your-app.vercel.app",
                        mobileWebUrl: "https://your-app.vercel.app",
                    },
                },
            ],
        });
    };

    return (
        <>
            <Stack direction="row" gap={2} justifyContent="center">
                <Button
                    variant="outlined"
                    startIcon={<Share2 size={18} />}
                    sx={{
                        borderColor: "#FCB454",
                        color: "#FCB454",
                        "&:hover": {
                            backgroundColor: "#FCB454",
                            color: "#fff",
                        },
                    }}
                    onClick={handleWebShareOrClipboard}
                >
                    공유하기
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<MessageCircleMore size={18} />}
                    sx={{
                        borderColor: "#F16767",
                        color: "#F16767",
                        "&:hover": {
                            backgroundColor: "#F16767",
                            color: "#fff",
                        },
                    }}
                    onClick={handleKakaoShare}
                >
                    카카오톡
                </Button>
            </Stack>

            <Snackbar
                open={toastOpen}
                autoHideDuration={2000}
                onClose={() => setToastOpen(false)}
                message="📋 공유 문구 복사 완료!"
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </>
    );
};

export default ShareButton;
