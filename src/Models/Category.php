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

        $category->categoryId = $row[0]["categoryId"];
        $category->categoryName = $row[0]["categoryName"];

        $category->products = [];

        foreach ($row as $productRow) {
            $productDTO = ProductDTO::fromRow($productRow);

            array_push($category->products, $productDTO);
        }

        return $category;
    }
}
