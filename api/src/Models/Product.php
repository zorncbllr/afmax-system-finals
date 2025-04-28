<?php

namespace Src\Models;

use DateTime;

class Product
{
    public int $productId;
    public string $productName, $description;
    public float $price;
    public Brand $brand;
    public DateTime $createdAt, $updatedAt;

    /** @var array<ProductImage> $images */
    public array $images;
}
