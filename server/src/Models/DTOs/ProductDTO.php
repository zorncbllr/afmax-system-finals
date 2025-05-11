<?php

namespace Src\Models\DTOs;

class ProductDTO
{
    public int $productId;
    public string $productName, $brand;
    public float $price;
    public string $image;
    public bool $isFeatured;
}
