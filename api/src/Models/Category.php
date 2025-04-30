<?php

namespace Src\Models;

class Category
{
    public int $categoryId;
    public string $categoryName;

    /** @var array<ProductDTO> */
    public array $products;

    public static function fromRow(array $row): Category
    {
        $category = new Category();

        $category->categoryId = $row["categoryId"];
        $category->categoryName = $row["categoryName"];

        $category->products = $row['products'] !== null ? explode(",", $row["products"]) : [];

        return $category;
    }
}
