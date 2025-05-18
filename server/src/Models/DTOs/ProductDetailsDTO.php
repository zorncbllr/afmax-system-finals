<?php

namespace Src\Models\DTOs;

use Src\Core\Request;

class ProductDetailsDTO
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

    /** @var array<string> $units */
    public array $units;
}
