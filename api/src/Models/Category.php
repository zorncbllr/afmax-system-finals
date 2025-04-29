<?php

namespace Src\Models;

class Category
{
    public int $categoryId;
    public string $categoryName;

    public static function fromRow(array $row): Category
    {
        $category = new Category();

        $category->categoryId = $row["categoryId"];
        $category->categoryName = $row["categoryName"];

        return $category;
    }
}
