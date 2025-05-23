<?php

namespace Src\Factories;

use DateTime;
use Src\Models\DTOs\InventoryDTO;

class InventoryDTOFactory
{
    public function makeInventoryDTO(array $row): InventoryDTO
    {
        $inventory = new InventoryDTO();

        $inventory->inventoryId = $row["inventoryId"];
        $inventory->productId = $row["productId"];
        $inventory->unit = $row["unit"] ?? "";
        $inventory->product = $row["product"];
        $inventory->abbreviation = $row["abbreviation"] ?? "";
        $inventory->dateStocked = (new DateTime($row["dateStocked"]))->format('F j, Y');
        $inventory->quantity = $row["quantity"] ?? 0;

        $inventory->expiration = $row["expiration"] == null ? null : (new DateTime($row["expiration"]))->format('F j, Y');
        $inventory->isExpired = $row["expiration"] == null ? false : (new DateTime($row["expiration"])) < (new DateTime());

        return $inventory;
    }
}
