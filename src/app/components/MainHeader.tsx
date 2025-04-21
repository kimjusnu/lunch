"use client";

const MainHeader = () => {
    return (
        <h1
            className="text-4xl md:text-4xl font-bold text-center leading-snug"
            style={{
                color: "#FF9B17", // 주황 톤 강조
                textShadow: "1px 1px 0 #FFF085", // 연노랑 그림자 느낌
            }}
        >
            오늘 점심 뭐 먹지?
        </h1>
    );
};

export default MainHeader;
