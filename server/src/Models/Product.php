<?php

namespace Src\Models;

class Product
{
    public int $productId, $brandId;
    public string $productName, $description;
    public float $price;
    public bool $isFeatured;
    public string $createdAt, $updatedAt;
}
