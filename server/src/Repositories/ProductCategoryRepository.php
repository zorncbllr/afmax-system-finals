<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\Category;
use Src\Models\Product;
use Src\Models\ProductCategory;

class ProductCategoryRepository
{
    public function __construct(protected Database $database) {}

    /** @return array<ProductCategory> */
    public function getRelationships(int $productId): array
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM productCategories WHERE productId = :productId"
        );

        $stmt->execute(["productId" => $productId]);

        return $stmt->fetchAll(PDO::FETCH_CLASS, ProductCategory::class);
    }

    public function createRelationship(Category $category, Product $product)
    {
        $stmt = $this->database->prepare(
            "INSERT INTO productCategories (categoryId, productId) 
            VALUES (:categoryId, :productId)"
        );

        $stmt->execute([
            "categoryId" => $category->categoryId,
            "productId" => $product->productId
        ]);
    }

    public function removeConnection(Category $category, Product $product)
    {
        $stmt = $this->database->prepare(
            "DELETE FROM productCategories
            WHERE categoryId = :categoryId
            AND productId = :productId"
        );

        $stmt->execute([
            "categoryId" => $category->categoryId,
            "productId" => $product->productId
        ]);
    }
}
