"use client";

import { Chip, Stack, Divider, Box } from "@mui/material";

interface FilterChipsProps {
    selectedCategories: string[];
    onCategoryToggle: (category: string) => void;
    onCategoryReset: () => void;
    filters: {
        isSpicy: boolean;
        isHot: boolean;
        isSoup: boolean;
        isRiceBased: boolean;
        isNoodleBased: boolean;
    };
    onToggle: (key: keyof FilterChipsProps["filters"]) => void;
}

const categoryOptionsTop = ["한식", "중식", "일식", "양식", "분식"];
const categoryOptionsBottom = [
    "패스트푸드",
    "아시안/동남아식",
    "샐러드/다이어트",
];

const FilterChips = ({
    filters,
    onToggle,
    selectedCategories,
    onCategoryToggle,
}: FilterChipsProps) => {
    const commonChipStyles = (selected: boolean, color: string) => ({
        backgroundColor: selected ? color : "transparent",
        color: selected ? "#fff" : "#000",
        fontWeight: selected ? "bold" : "normal",
        border: `1px solid ${color}`,
        transition: "none",
        "&:hover": {
            backgroundColor: selected ? color : "#f5f5f5",
            color: selected ? "#fff" : "#000",
        },
    });

    return (
        <Stack spacing={2} alignItems="center" width="100%">
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
                {categoryOptionsTop.map(category => {
                    const selected = selectedCategories.includes(category);
                    return (
                        <Chip
                            key={category}
                            label={category}
                            onClick={() => onCategoryToggle(category)}
                            sx={commonChipStyles(selected, "#FCB454")}
                        />
                    );
                })}
            </Box>

            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
                {categoryOptionsBottom.map(category => {
                    const selected = selectedCategories.includes(category);
                    return (
                        <Chip
                            key={category}
                            label={category}
                            onClick={() => onCategoryToggle(category)}
                            sx={commonChipStyles(selected, "#FCB454")}
                        />
                    );
                })}
            </Box>

            <Divider sx={{ width: "100%", my: 1 }} />

            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
                {(
                    Object.entries(filters) as [keyof typeof filters, boolean][]
                ).map(([key, value]) => {
                    let label = "";
                    switch (key) {
                        case "isSpicy":
                            label = "매운 음식";
                            break;
                        case "isHot":
                            label = "따뜻한 음식";
                            break;
                        case "isSoup":
                            label = "국물 있는";
                            break;
                        case "isRiceBased":
                            label = "밥";
                            break;
                        case "isNoodleBased":
                            label = "면";
                            break;
                    }

                    return (
                        <Chip
                            key={key}
                            label={label}
                            onClick={() => onToggle(key)}
                            sx={commonChipStyles(value, "#F16767")}
                        />
                    );
                })}
            </Box>
        </Stack>
    );
};

export default FilterChips;
