<?php

namespace Src\Repositories;

use PDO;
use Src\Core\App;
use Src\Models\Product;
use Src\Models\ProductDTO;

class ProductRepository
{
    /** @return array<ProductDTO> */
    public function getAllProducts(): array
    {
        $db = App::getDatabase();

        $stmt = $db->prepare(
            "SELECT 
            p.productId,
            p.productName,
            b.brandName AS brand,
            p.price,
            pi.imagePath
        FROM products p
        JOIN brands b ON b.brandId = p.brandId
        JOIN (
            SELECT productId, MIN(productImageId) AS firstImageId
            FROM productImages
            GROUP BY productId
        ) firstImages ON firstImages.productId = p.productId
        JOIN productImages pi ON pi.productImageId = firstImages.firstImageId;"
        );
        $stmt->execute();

        $products = array_map(
            fn($row) => ProductDTO::fromRow($row),
            $stmt->fetchAll(PDO::FETCH_ASSOC)
        );

        return $products;
    }

    /** @return Product */
    public function getProductById(int $productId): Product
    {
        $db = App::getDatabase();

        $stmt = $db->prepare(
            "SELECT 
            p.productId,
            p.productName,
            p.description,
            p.price,
            p.createdAt,
            p.updatedAt,
            b.brandName AS brand,
            GROUP_CONCAT(DISTINCT pi.imagePath) AS images,
            GROUP_CONCAT(DISTINCT c.categoryName) AS categories
        FROM products p
        JOIN brands b ON p.brandId = b.brandId
        LEFT JOIN productImages pi ON p.productId = pi.productId
        LEFT JOIN productCategories pc ON p.productId = pc.productId
        LEFT JOIN categories c ON pc.categoryId = c.categoryId
        WHERE p.productId = :productId
        GROUP BY p.productId;"
        );

        $stmt->execute(["productId" => $productId]);

        return Product::fromRow($stmt->fetch(PDO::FETCH_ASSOC));
    }

    public function createProduct(Product $product)
    {
        $db = App::getDatabase();
    }
}
