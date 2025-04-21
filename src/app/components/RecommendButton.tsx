// components/RecommendButton.tsx
"use client";

import { Button } from "@mui/material";
import { RefreshCw } from "lucide-react"; // ← Lucide 아이콘

const RecommendButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onClick}
            startIcon={<RefreshCw size={20} />}
            sx={{
                backgroundColor: "#FF9B17",
                color: "white",
                "&:hover": {
                    backgroundColor: "#FCB454",
                },
            }}
        >
            다른 메뉴 추천받기
        </Button>
    );
};

export default RecommendButton;
