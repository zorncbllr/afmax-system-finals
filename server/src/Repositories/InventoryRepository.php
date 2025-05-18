<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\Inventory;
use Src\Models\Product;

class InventoryRepository
{

    public function __construct(protected Database $database) {}

    public function getInventoryData(): array
    {
        $stmt = $this->database->prepare(
            "SELECT 
            i.`inventoryId`,
            i.`quantity`,
            p.`productId`, 
            p.`productName` as product, 
            u.`unitName` as unit, 
            u.`abbreviation`,  
            i.`updatedAt` as dateStocked,
            i.`expiration`
            FROM inventories i
            LEFT JOIN units u
            ON i.`unitId` = u.`unitId`
            JOIN products p
            ON p.`productId` = i.`productId`"
        );

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getInventoryDataById(int $inventoryId)
    {
        $stmt = $this->database->prepare(
            "SELECT 
            i.`inventoryId`,
            i.`quantity`,
            p.`productId`, 
            p.`productName` as product, 
            u.`unitName` as unit, 
            u.`abbreviation`,  
            i.`updatedAt` as dateStocked,
            i.`expiration`
            FROM inventories i
            LEFT JOIN units u
            ON i.`unitId` = u.`unitId`
            JOIN products p
            ON p.`productId` = i.`productId`
            WHERE i.`inventoryId` = :inventoryId"
        );

        $stmt->execute(["inventoryId" => $inventoryId]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getInventoryByProductId(int $productId) {}

    public function createInventory(int $productId): Inventory
    {
        $stmt = $this->database->prepare(
            "INSERT INTO inventories (productId) VALUES (:productId);"
        );

        $stmt->execute(["productId" => $productId]);

        $inventory = new Inventory();

        $inventory->inventoryId = $this->database->lastInsertId();
        $inventory->productId = $productId;

        return $inventory;
    }

    public function updateInventory(Inventory $inventory)
    {
        $stmt = $this->database->prepare(
            "UPDATE inventories
            SET productId = :productId,
            unitId = :unitId,
            quantity = :quantity,
            expiration = :expiration
            WHERE inventoryId = :inventoryId"
        );

        $stmt->execute([
            "inventoryId" => $inventory->inventoryId,
            "productId" => $inventory->productId,
            "unitId" => $inventory->unitId,
            "quantity" => $inventory->quantity,
            "expiration" => $inventory->expiration
        ]);
    }


    public function updateQuantity(int $inventoryId, int $quantity)
    {
        $stmt = $this->database->prepare(
            "UPDATE inventories
            SET quantity = :quantity
            WHERE inventoryId = :inventoryId"
        );

        $stmt->execute([
            "inventoryId" => $inventoryId,
            "quantity" => $quantity,
        ]);
    }

    public function deleteInventory(int $inventoryId)
    {
        $stmt = $this->database->prepare(
            "DELETE FROM inventories WHERE inventoryId = :inventoryId"
        );

        $stmt->execute(["inventoryId" => $inventoryId]);
    }
}
