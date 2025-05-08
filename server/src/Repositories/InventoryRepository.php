<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\Inventory;

class InventoryRepository
{

    public function __construct(protected Database $database) {}

    /** @return array<Inventory> */
    public function getInventoryData(): array
    {
        $stmt = $this->database->prepare(
            "SELECT 
            i.`inventoryId`,
            quantity, 
            `productName` as product, 
            `unitName` as unit, 
            abbreviation,  
            i.`updatedAt` as dateStocked,
            i.expiration
            FROM inventories i
            JOIN units u
            ON i.`unitId` = u.`unitId`
            JOIN products p
            ON p.`productId` = i.`productId`"
        );

        $stmt->execute();

        return array_map(
            fn($row) => Inventory::fromRow($row),
            $stmt->fetchAll(PDO::FETCH_ASSOC)
        );
    }
}
