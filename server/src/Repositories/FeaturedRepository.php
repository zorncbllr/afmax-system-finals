<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;

class FeaturedRepository
{
    public function __construct(protected Database $database) {}

    public function getAllFeatured(int $categoryLimit, int $productsLimit): array
    {
        $stmt = $this->database->prepare(
            "SELECT
                c.categoryId,
                c.categoryName,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'productId', p.productId,
                        'productName', p.productName,
                        'brand', b.brandName,
                        'price', p.price,
                        'isFeatured', p.isFeatured,
                        'image', ( 
                            SELECT pi.imagePath
                            FROM productImages pi
                            WHERE pi.productId = p.productId
                            LIMIT 1
                        )
                    )
                ) AS products
            FROM (
                SELECT * FROM categories LIMIT $categoryLimit
            ) AS c
            JOIN productCategories pc ON c.categoryId = pc.categoryId
            JOIN (
                SELECT *
                FROM (
                    SELECT 
                        pcInner.categoryId,
                        pInner.productId,
                        pInner.productName,
                        pInner.brandId,
                        pInner.price,
                        pInner.isFeatured,
                        ROW_NUMBER() OVER (
                            PARTITION BY pcInner.categoryId
                            ORDER BY pInner.productId
                        ) AS rn
                    FROM productCategories pcInner
                    JOIN products pInner 
                        ON pcInner.productId = pInner.productId
                    WHERE pInner.isFeatured = TRUE
                ) ranked
                WHERE rn <= $productsLimit
            ) limitedProducts 
                ON pc.categoryId = limitedProducts.categoryId 
                AND pc.productId = limitedProducts.productId
            JOIN products p ON p.productId = limitedProducts.productId
            JOIN brands b ON p.brandId = b.brandId
            GROUP BY c.categoryId, c.categoryName;"
        );

        $stmt->execute();

        return  $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function setFeatured(int $productId, bool $value)
    {
        $stmt = $this->database->prepare(
            "UPDATE products SET isFeatured = :isFeatured WHERE productId = :productId"
        );

        $stmt->execute([
            "isFeatured" => (int) $value,
            "productId" => $productId
        ]);
    }
}
