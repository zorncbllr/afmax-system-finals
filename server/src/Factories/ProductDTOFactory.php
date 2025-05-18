<?php

namespace Src\Factories;

use Src\Models\DTOs\ProductDetailsDTO;
use Src\Models\DTOs\ProductDTO;
use Src\Models\DTOs\ProductTableDTO;

class ProductDTOFactory
{
    public function makeProductDTO(array $row): ProductDTO
    {
        $productDTO = new ProductDTO();

        $productDTO->productId = $row["productId"];
        $productDTO->productName = $row["productName"];
        $productDTO->brand = $row["brand"];
        $productDTO->price = $row["price"];
        $productDTO->isFeatured = $row["isFeatured"];
        $productDTO->image = $row["image"] ?? "No image";

        return $productDTO;
    }

    public function makeProductTableDTO(array $row): ProductTableDTO
    {
        $product = new ProductTableDTO();

        $product->productId = $row["productId"];
        $product->productName = $row["productName"];
        $product->brand = $row["brand"];
        $product->price = $row["price"];
        $product->isFeatured = $row["isFeatured"];
        $product->image = $row["image"] ?? "No image";

        $product->categories = $row['categories'] !== null ? explode(",", $row["categories"]) : [];

        return $product;
    }

    public function makeProductDetailsDTO(array $row): ProductDetailsDTO
    {
        $product = new ProductDetailsDTO();
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
        $product->units = $row['units'] !== null ? explode(",", $row["units"]) : [];

        return $product;
    }
}
