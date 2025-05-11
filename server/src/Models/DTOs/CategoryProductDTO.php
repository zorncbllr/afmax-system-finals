<?php

namespace Src\Models\DTOs;

class CategoryProductDTO
{
    public int $categoryId;
    public string $categoryName;

    /** @var array<ProductDTO> */
    public array $products;
}
