<?php

namespace Src\Models;

use DateTime;

class Inventory
{
    public int $inventoryId, $unitId, $productId;
    public int $quantity;
    public DateTime $expiration, $createdAt, $updatedAt;
}
