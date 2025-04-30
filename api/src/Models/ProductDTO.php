<?php

namespace Src\Models;

class ProductDTO
{
    public int $productId;
    public string $productName, $brand;
    public float $price;
    public string $imagePath;

    public static function fromRow(array $row): ProductDTO
    {
        $productDTO = new ProductDTO();

        $productDTO->productId = $row["productId"];
        $productDTO->productName = $row["productName"];
        $productDTO->brand = $row["brand"];
        $productDTO->price = $row["price"];
        $productDTO->imagePath = $row["imagePath"];

        return $productDTO;
    }
}
