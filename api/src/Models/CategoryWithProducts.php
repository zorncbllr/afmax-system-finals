<?php

namespace Src\Models;

class CategoryWithProducts extends Category
{
    /** @var array<Product> */
    public array $products;

    public static function fromRow(array $row): CategoryWithProducts
    {
        $category = new CategoryWithProducts();

        $category->categoryId = $row["categoryId"];
        $category->categoryName = $row["categoryName"];

        $category->products = $row['products'] !== null ? explode(",", $row["images"]) : [];

        return $category;
    }
}
