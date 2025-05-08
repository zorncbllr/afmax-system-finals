<?php

namespace Src\Models;

use DateTime;

class Inventory
{
    public int $inventoryId;
    public string $unit, $product, $abbreviation;
    public string $expiration, $dateStocked, $quantity;
    public bool $isExpired;

    public static function fromRow(array $row): Inventory
    {
        $inventory = new Inventory();

        $inventory->inventoryId = $row["inventoryId"];
        $inventory->unit = $row["unit"] ?? "----";
        $inventory->product = $row["product"];
        $inventory->abbreviation = $row["abbreviation"] ?? "----";
        $inventory->dateStocked = (new DateTime($row["dateStocked"]))->format('F j, Y');
        $inventory->quantity = $row["quantity"] ?? "----";

        $inventory->expiration = $row["expiration"] == null ? "----" : (new DateTime($row["expiration"]))->format('F j, Y');
        $inventory->isExpired = $row["expiration"] == null ? false : (new DateTime($row["expiration"])) < (new DateTime());

        return $inventory;
    }
}
