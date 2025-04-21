"use client";

import { useState, useEffect } from "react";
import { foodList } from "./data/foodList";
import { getRandomFood, filterFoods } from "./utils/foodUtils";

import ShareButton from "./components/ShareButton";
import MainHeader from "./components/MainHeader";
import FoodCard from "./components/FoodCard";
import RecommendButton from "./components/RecommendButton";
import FilterChips from "./components/FilterChips";

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

export default function HomePage() {
    const [filters, setFilters] = useState({
        isSpicy: false,
        isHot: false,
        isSoup: false,
        isRiceBased: false,
        isNoodleBased: false,
    });

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selected, setSelected] = useState<(typeof foodList)[number] | null>(
        null
    );

    // ✅ CSR에서만 랜덤 추천 실행되도록 useEffect 사용
    useEffect(() => {
        const random = getRandomFood(foodList);
        setSelected(random);
    }, []);

    const handleToggleFilter = (key: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev],
        }));
    };

    const handleCategoryToggle = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleCategoryReset = () => {
        setSelectedCategories(prev =>
            prev.length === categoryOptions.length ? [] : categoryOptions
        );
    };

    const handleRecommend = () => {
        const filtered = filterFoods({
            categories:
                selectedCategories.length > 0 ? selectedCategories : undefined,
            ...filters,
        });

        if (filtered.length > 0) {
            setSelected(getRandomFood(filtered));
        } else {
            alert("조건에 맞는 음식이 없어요! 필터를 다시 선택해보세요.");
        }
    };

    return (
        <main className="flex flex-col items-center justify-center px-4 py-8 gap-6 h-screen bg-[#fffde8]">
            <MainHeader />
            <FilterChips
                filters={filters}
                onToggle={handleToggleFilter}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                onCategoryReset={handleCategoryReset}
            />
            {/* ✅ selected가 세팅된 경우에만 렌더링하여 hydration mismatch 방지 */}
            {selected && (
                <>
                    <FoodCard food={selected} />
                    <RecommendButton onClick={handleRecommend} />
                    <ShareButton
                        foodName={selected.name}
                        message={selected.message}
                        imageUrl={selected.image}
                    />
                </>
            )}
        </main>
    );
}
