// components/FoodCard.tsx
import Image from "next/image";

interface FoodCardProps {
    food: {
        name: string;
        image: string;
        message: string;
    };
}

const FoodCard = ({ food }: FoodCardProps) => {
    return (
        <div className="w-full max-w-xs bg-[#FFF085] rounded-xl shadow-lg p-4 text-center">
            <Image
                src={food.image}
                alt={food.name}
                width={180}
                height={140}
                className="mx-auto"
            />
            <h2 className="text-xl font-bold mt-4">{food.name}</h2>
            <p className="text-sm text-gray-700 mt-2">{food.message}</p>
        </div>
    );
};

export default FoodCard;
