<?php

namespace Src\Models;

class Inventory
{
    public int $inventoryId, $unitId, $productId;
    public int $quantity;
    public string $createdAt, $updatedAt;
    public string|null $expiration;
}
