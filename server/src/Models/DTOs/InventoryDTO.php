<?php

namespace Src\Models\DTOs;

class InventoryDTO
{
    public int $inventoryId, $productId, $quantity;
    public string $product;
    public string $unit, $abbreviation;
    public string $expiration, $dateStocked;
    public bool $isExpired;
}
