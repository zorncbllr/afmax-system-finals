<?php

namespace Src\Models;

class CategoryDTO
{
    public int $categoryId;
    public string $categoryName;

    public static function fromRow(array $row): CategoryDTO
    {
        $categoryDTO = new CategoryDTO();

        $categoryDTO->categoryId = $row["categoryId"];
        $categoryDTO->categoryName = $row["categoryName"];

        return $categoryDTO;
    }
}
