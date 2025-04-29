<?php

namespace Src\Repositories;

use PDO;
use Src\Core\App;
use Src\Models\Category;

class CategoryRepository
{
    /** @return array<Category> */
    public function getAllCategories(): array
    {
        $db = App::getDatabase();

        $stmt = $db->prepare(
            "SELECT * FROM categories"
        );

        $stmt->execute();

        $categories = array_map(
            fn($row) => Category::fromRow($row),
            $stmt->fetchAll(PDO::FETCH_ASSOC)
        );

        return $categories;
    }

    /** @return Category */
    public function getCategoryById(int $categoryId): Category
    {
        $db = App::getDatabase();

        $stmt = $db->prepare(
            "SELECT * FROM categories WHERE categoryId = :categoryId"
        );

        $stmt->execute(["categoryId" => $categoryId]);

        return Category::fromRow($stmt->fetch(PDO::FETCH_ASSOC));
    }
}
