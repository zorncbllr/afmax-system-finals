<?php

namespace Src\Models\DTOs;

class InventoryDTO
{
    public int $inventoryId;
    public string $product;
    public string $unit, $abbreviation;
    public string $expiration, $dateStocked, $quantity;
    public bool $isExpired;
}
