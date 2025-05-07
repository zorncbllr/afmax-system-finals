<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\ProductCategory;

class ProductCategoryRepository
{
    public function __construct(protected Database $database) {}

    /** @return array<ProductCategory> */
    public function getRelationshipsWith(int $productId): array
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM productCategories WHERE productId = :productId"
        );

        $stmt->execute(["productId" => $productId]);

        return $stmt->fetchAll(PDO::FETCH_CLASS, ProductCategory::class);
    }
}
