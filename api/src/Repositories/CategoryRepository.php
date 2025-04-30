<?php

namespace Src\Repositories;

use PDO;
use Src\Core\App;
use Src\Models\Category;
use Src\Models\CategoryDTO;

class CategoryRepository
{
    /** @return array<CategoryDTO> */
    public function getAllCategories(): array
    {
        $db = App::getDatabase();

        $stmt = $db->prepare(
            "SELECT * FROM categories"
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
        $db = App::getDatabase();

        $stmt = $db->prepare(
            "SELECT 
            c.categoryId,
            c.categoryName,
            p.productId,
            p.productName,
            b.brandName AS brand,
            p.price,
            pi.imagePath AS displayImagePath
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
        WHERE c.categoryId = :categoryId"
        );

        $stmt->execute(["categoryId" => $categoryId]);

        return Category::fromRow($stmt->fetch(PDO::FETCH_ASSOC));
    }
}
