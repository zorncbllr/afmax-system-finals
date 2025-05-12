<?php

namespace Src\Repositories;

use Src\Core\Database;
use Src\Models\Unit;

class UnitRepository
{

    public function __construct(protected Database $database) {}

    public function getUnitByName(string $unitName): Unit|bool
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM units WHERE unitName = :unitName"
        );

        $stmt->execute(["unitName" => $unitName]);

        return $stmt->fetchObject(Unit::class) ?? false;
    }

    public function createUnit(Unit $unit): Unit
    {
        $stmt = $this->database->prepare(
            "INSERT INTO units (unitName, abbreviation) VALUES (:unitName, :abbreviation)"
        );

        $stmt->execute([
            "unitName" => $unit->unitName,
            "abbreviation" => $unit->abbreviation
        ]);

        $unit->unitId = $this->database->lastInsertId();

        return $unit;
    }

    public function deleteUnit(int $unitId)
    {
        $stmt = $this->database->prepare(
            "DELETE FROM units WHERE unitId = :unitId"
        );

        $stmt->execute(["unitId" => $unitId]);
    }
}
