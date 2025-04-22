"use client";
import { useState } from "react";
import Image from "next/image";

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    rounded?: boolean;
}

const ImageWithSkeleton = ({
    src,
    alt,
    width,
    height,
    className,
    rounded = true,
}: ImageWithSkeletonProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div
            className="relative"
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            {!isLoaded && (
                <div
                    className={`absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse ${
                        rounded ? "rounded-md" : ""
                    }`}
                />
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`transition-opacity duration-300 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                } ${className ?? ""}`}
                onLoadingComplete={() => setIsLoaded(true)}
                priority
            />
        </div>
    );
};

export default ImageWithSkeleton;
