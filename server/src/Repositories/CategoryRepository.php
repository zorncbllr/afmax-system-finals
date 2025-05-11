<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\Category;
use Src\Models\DTOs\CategoryDTO;
use Src\Models\DTOs\CategoryProductDTO;

class CategoryRepository
{
    public function __construct(protected Database $database) {}


    public function findCategoryByName(string $categoryName): Category
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM categories WHERE categoryName = :categoryName"
        );

        $stmt->execute(["categoryName" => $categoryName]);

        return $stmt->fetchObject(Category::class);
    }


    /** @return array<CategoryDTO> */
    public function getAllCategories(): array
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM categories ORDER BY categoryId ASC"
        );

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS, CategoryDTO::class);
    }

    public function getAssociatedProducts(int $categoryId): array
    {
        $stmt = $this->database->prepare(
            "SELECT 
            c.categoryId,
            c.categoryName,
            p.productId,
            p.productName,
            b.brandName AS brand,
            p.price,
            p.isFeatured,
            pi.imagePath 
        FROM categories c
        JOIN productCategories pc ON pc.categoryId = c.categoryId
        JOIN products p ON p.productId = pc.productId
        JOIN brands b ON b.brandId = p.brandId
        JOIN (
            SELECT productId, MIN(productImageId) AS firstImageId
            FROM productImages
            GROUP BY productId
        ) firstImages ON firstImages.productId = p.productId
        JOIN productImages pi ON pi.productImageId = firstImages.firstImageId
        WHERE c.categoryId = :categoryId;"
        );

        $stmt->execute(["categoryId" => $categoryId]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createCategory(string $categoryName): Category
    {
        $stmt = $this->database->prepare(
            "INSERT INTO categories (categoryName) VALUES (:categoryName)"
        );

        $stmt->execute(['categoryName' => $categoryName]);

        $category = new Category();

        $category->categoryId = $this->database->lastInsertId();
        $category->categoryName = $categoryName;

        return $category;
    }

    public function deleteCategory(int $categoryId)
    {
        $stmt = $this->database->prepare("DELETE FROM categories WHERE categoryId = :categoryId");
        $stmt->execute(["categoryId" => $categoryId]);
    }
}
