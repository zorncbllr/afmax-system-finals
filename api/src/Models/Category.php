<?php

namespace Src\Models;

class Category
{
    public int $categoryId;
    public string $categoryName;

    /** @var array<Product> $products */
    public array $products;

    public static function fromRow(array $row): Category
    {
        $category = new Category();

        return $category;
    }
}
