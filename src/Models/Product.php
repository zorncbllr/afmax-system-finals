<?php

namespace Src\Models;

class Product
{
    public int $productId;
    public string $productName, $description, $brand;
    public float $price;
    public string $createdAt, $updatedAt;

    /** @var array<string> $images */
    public array $images;

    /** @var array<string> $categories */
    public array $categories;


    /** @return Product */
    public static function fromRow(array $row): Product
    {
        $product = new Product();
        $product->productId = $row['productId'];
        $product->productName = $row['productName'];
        $product->description = $row['description'];
        $product->price = $row['price'];
        $product->brand = $row['brand'];

        $product->createdAt = $row['createdAt'];
        $product->updatedAt = $row['updatedAt'];

        $product->images = $row['images'] !== null ? explode(",", $row["images"]) : [];
        $product->categories = $row['categories'] !== null ? explode(",", $row["categories"]) : [];

        return $product;
    }
}
