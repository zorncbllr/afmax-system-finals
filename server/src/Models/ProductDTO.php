<?php

namespace Src\Models;

class ProductDTO
{
    public int $productId;
    public string $productName, $brand;
    public float $price;
    public string $imagePath;
    public bool $isFeatured;

    /** @var array<string> $categories */
    public array $categories;

    public static function fromRow(array $row): ProductDTO
    {
        $productDTO = new ProductDTO();

        $productDTO->productId = $row["productId"];
        $productDTO->productName = $row["productName"];
        $productDTO->brand = $row["brand"];
        $productDTO->price = $row["price"];
        $productDTO->isFeatured = $row["isFeatured"];
        $productDTO->imagePath = $row["imagePath"];

        $productDTO->categories = $row['categories'] !== null ? explode(",", $row["categories"]) : [];

        return $productDTO;
    }
}
