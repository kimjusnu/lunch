"use client";

import { useEffect, useState } from "react";
import { foodList, FoodItem } from "../data/foodList";
import { getRandomFood, filterFoods } from "../utils/foodUtils";
import FoodCard from "./FoodCard";
import RecommendButton from "./RecommendButton";
import FilterChips from "./FilterChips";
import MainHeader from "./MainHeader";
import ShareButton from "./ShareButton";
import KakaoAdBanner_250 from "./KakaoAdBanner_250";
import KakaoAdBanner_300 from "./KakaoAdBanner_300";
import AdSenseBanner from "./AdSenseBanner";

const categoryOptions = [
    "한식",
    "중식",
    "일식",
    "양식",
    "분식",
    "패스트푸드",
    "아시안/동남아식",
    "샐러드/다이어트",
];

const ClientMain = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [filters, setFilters] = useState({
        isSpicy: false,
        isHot: false,
        isSoup: false,
        isRiceBased: false,
        isNoodleBased: false,
    });

    const [selected, setSelected] = useState<FoodItem | null>(null);
    const [history, setHistory] = useState<FoodItem[]>([]);
    const [clickCount, setClickCount] = useState(0); // ✅ 추천 클릭 횟수 추적

    useEffect(() => {
        const random = getRandomFood(foodList);
        setSelected(random);
        setHistory([random]);
    }, []);

    const handleRecommend = () => {
        const filtered = filterFoods({
            categories:
                selectedCategories.length > 0 ? selectedCategories : undefined,
            ...filters,
        });

        if (filtered.length === 0) {
            alert("조건에 맞는 음식이 없어요!");
            return;
        }

        let newFood = getRandomFood(filtered);
        let attempts = 0;
        while (newFood.id === selected?.id && attempts < 10) {
            newFood = getRandomFood(filtered);
            attempts++;
        }

        setSelected(newFood);
        setClickCount(prev => prev + 1); // ✅ 클릭 카운트 증가

        setHistory(prev => {
            const exists = prev.find(item => item.id === newFood.id);
            if (exists) return prev;
            return [newFood, ...prev.slice(0, 4)];
        });
    };

    return (
        <main className="flex flex-col items-center justify-center px-4 py-8 gap-6">
            <MainHeader />

            <FilterChips
                filters={filters}
                onToggle={(key: keyof typeof filters) => {
                    setFilters(prev => ({
                        ...prev,
                        [key]: !prev[key],
                    }));
                }}
                selectedCategories={selectedCategories}
                onCategoryToggle={cat =>
                    setSelectedCategories(prev =>
                        prev.includes(cat)
                            ? prev.filter(c => c !== cat)
                            : [...prev, cat]
                    )
                }
                onCategoryReset={() =>
                    setSelectedCategories(prev =>
                        prev.length === categoryOptions.length
                            ? []
                            : categoryOptions
                    )
                }
            />

            {selected && <FoodCard food={selected} />}
            <RecommendButton onClick={handleRecommend} />

            {/* ✅ 광고 1 - 추천 버튼 아래 (카카오) */}
            <KakaoAdBanner_250 />

            {/* ✅ 광고 2 - 5회 클릭 시 애드센스 배너 표시 */}
            {clickCount >= 5 && (
                <div className="w-full flex justify-center">
                    <AdSenseBanner />
                </div>
            )}

            {selected && (
                <ShareButton
                    foodName={selected.name}
                    message={selected.message}
                    imageUrl={selected.image}
                />
            )}

            {history.length > 1 && (
                <section className="mt-8 w-full max-w-md">
                    <h3 className="text-lg font-semibold text-center mb-2 text-[#F16767]">
                        최근 본 메뉴
                    </h3>

                    {/* ✅ 광고 3 - 히스토리 위 */}
                    <div className="flex justify-center mb-4">
                        <KakaoAdBanner_300 />
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {history.slice(1).map(food => (
                            <FoodCard key={food.id} food={food} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

export default ClientMain;
