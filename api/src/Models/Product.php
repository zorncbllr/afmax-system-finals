<?php

namespace Src\Models;

use DateTime;

class Product
{
    public int $productId;
    public string $productName, $description, $brand;
    public float $price;
    public string $createdAt, $updatedAt;

    /** @var array<ProductImage> $images */
    public array $images;


    /** @return Product */
    public static function fromRow(array $row)
    {
        $product = new Product();
        $product->productId = $row['productId'];
        $product->productName = $row['productName'];
        $product->description = $row['description'];
        $product->price = $row['price'];
        $product->createdAt = $row['createdAt'];
        $product->updatedAt = $row['updatedAt'];

        $product->brand = $row['brand'];

        $product->images = explode(",", $row["images"]);

        return $product;
    }
}
