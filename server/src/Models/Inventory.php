<?php

namespace Src\Models;

class Inventory
{
    public int $inventoryId, $unitId, $productId;
    public int $quantity;
    public string $expiration, $createdAt, $updatedAt;
}
