"use client";
import ImageWithSkeleton from "./ImageWithSkeleton";

interface FoodCardProps {
    food: {
        name: string;
        image: string;
        message: string;
    };
}

const FoodCard = ({ food }: FoodCardProps) => {
    return (
        <div className="w-full max-w-xs mx-auto bg-[#FFF085] rounded-xl shadow-lg p-4 text-center">
            <div className="flex items-center justify-center w-full">
                <div className="relative w-[180px] h-[140px]">
                    <ImageWithSkeleton
                        src={food.image}
                        alt={food.name}
                        width={180}
                        height={140}
                        className="object-contain"
                    />
                </div>
            </div>
            <h2 className="text-xl font-bold mt-4">{food.name}</h2>
            <p className="text-sm text-gray-700 mt-2">{food.message}</p>
        </div>
    );
};

export default FoodCard;
