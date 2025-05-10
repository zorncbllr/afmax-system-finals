<?php

namespace Src\Models;

use Src\Core\Request;

class Product
{
    public int $productId;
    public string $productName, $description, $brand;
    public float $price;
    public bool $isFeatured;
    public string $createdAt, $updatedAt;

    /** @var array<string> $images */
    public array $images;

    /** @var array<string> $categories */
    public array $categories;

    public static function fromRow(array $row): Product
    {
        $product = new Product();
        $product->productId = $row['productId'];
        $product->productName = $row['productName'];
        $product->description = htmlspecialchars_decode($row['description']);
        $product->price = $row['price'];
        $product->brand = $row['brand'];
        $product->isFeatured = $row["isFeatured"];

        $product->createdAt = $row['createdAt'];
        $product->updatedAt = $row['updatedAt'];

        $product->images = $row['images'] !== null ? explode(",", $row["images"]) : [];
        $product->categories = $row['categories'] !== null ? explode(",", $row["categories"]) : [];

        return $product;
    }

    public static function fromRequest(Request $request): Product
    {
        $product = new Product();

        $product->productName = $request->productName;
        $product->brand = $request->brand;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->categories = $request->categories;
        $product->images = [];

        return $product;
    }
}
