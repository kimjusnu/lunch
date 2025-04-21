import { foodList } from "../data/foodList";

export const getRandomFood = (list = foodList) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
};

export const filterFoods = ({
    categories,
    isSpicy,
    isHot,
    isSoup,
    isRiceBased,
    isNoodleBased,
}: {
    categories?: string[];
    isSpicy?: boolean;
    isHot?: boolean;
    isSoup?: boolean;
    isRiceBased?: boolean;
    isNoodleBased?: boolean;
}) => {
    const hasAnyFilter =
        isSpicy || isHot || isSoup || isRiceBased || isNoodleBased;

    return foodList.filter(item => {
        const categoryMatch =
            !categories || categories.includes(item.category.trim());

        const conditionMatch =
            !hasAnyFilter ||
            (isSpicy && item.isSpicy) ||
            (isHot && item.isHot) ||
            (isSoup && item.isSoup) ||
            (isRiceBased && item.isRiceBased) ||
            (isNoodleBased && item.isNoodleBased);

        return categoryMatch && conditionMatch;
    });
};
