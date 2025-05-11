<?php

namespace Src\Services;

use Src\Core\Database;
use Src\Factories\InventoryDTOFactory;
use Src\Models\DTOs\InventoryDTO;
use Src\Repositories\InventoryRepository;

class InventoryService
{

    public function __construct(
        protected Database $database,
        protected InventoryRepository $inventoryRepository,
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
}
