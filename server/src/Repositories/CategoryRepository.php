<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\Category;
use Src\Models\CategoryDTO;
use Src\Models\Product;

class CategoryRepository
{
    public function __construct(protected Database $database) {}

    /** @return array<CategoryDTO> */
    public function getAllCategories(): array
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM categories;"
        );

        $stmt->execute();

        $categories = array_map(
            fn($row) => CategoryDTO::fromRow($row),
            $stmt->fetchAll(PDO::FETCH_ASSOC)
        );

        return $categories;
    }

    /** @return Category */
    public function getCategoryById(int $categoryId): Category
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

        return Category::fromRow($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public function createCategory(CategoryDTO $category): CategoryDTO
    {
        $stmt = $this->database->prepare("INSERT INTO categories (categoryName) VALUES (:categoryName)");
        $stmt->execute(['categoryName' => $category->categoryName]);

        $category->categoryId = $this->database->lastInsertId();

        return $category;
    }

    public function connectCategoryToProduct(CategoryDTO $category, Product $product)
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

    public function deleteCategory(int $categoryId)
    {
        $stmt = $this->database->prepare("DELETE FROM categories WHERE categoryId = :categoryId");
        $stmt->execute(["categoryId" => $categoryId]);
    }
}
