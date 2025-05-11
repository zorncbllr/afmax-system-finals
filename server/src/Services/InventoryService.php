<?php

namespace Src\Services;

use DateTime;
use PDOException;
use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Factories\InventoryDTOFactory;
use Src\Models\DTOs\InventoryDTO;
use Src\Models\Unit;
use Src\Repositories\InventoryRepository;
use Src\Repositories\UnitRepository;

class InventoryService
{

    public function __construct(
        protected Database $database,
        protected InventoryRepository $inventoryRepository,
        protected UnitRepository $unitRepository,
        protected InventoryDTOFactory $inventoryDTOFactory
    ) {}

    /** @return array<InventoryDTO> */
    public function getInventoryData(): array
    {
        return array_map(
            fn($row) => $this->inventoryDTOFactory->makeInventoryDTO($row),
            $this->inventoryRepository->getInventoryData()
        );
    }

    public function createNewInventory(Request $request)
    {
        try {
            $this->database->beginTransaction();

            $productId = $request->body->productId;

            $inventory = $this->inventoryRepository->createInventory($productId);

            $inventory->quantity = $request->body->quantity;

            $inventory->expiration = (new DateTime($request->body->expiration))->format('Y-m-d');

            $unit = new Unit();
            $unit->unitName = $request->body->unit;
            $unit->abbreviation = strtolower($request->body->abbreviation);

            try {
                $unit = $this->unitRepository->createUnit($unit);
            } catch (PDOException $e) {

                $unit = $this->unitRepository->getUnitByName($unit->unitName);
            }

            $inventory->unitId = $unit->unitId;

            $this->inventoryRepository->updateInventory($inventory);

            $this->database->commit();
        } catch (PDOException $e) {

            $this->database->rollBack();

            if ($e->getCode() == 23000) {
                throw new ServiceException("Duplicated inventory item.");
            }

            throw new ServiceException("Unable to create inventory item.");
        }
    }

    public function deleteInventory(int $inventoryId)
    {
        try {
            $this->inventoryRepository->deleteInventory($inventoryId);
        } catch (PDOException $e) {

            throw new ServiceException("Unable to delete inventory item");
        }
    }

    public function updateInventory(Request $request) {}
}
