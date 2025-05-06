<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\Product;
use Src\Models\ProductDTO;

class ProductRepository
{
    /** @return array<ProductDTO> */
    public function getAllProducts(Database $db): array
    {
        $stmt = $db->prepare(
            "SELECT 
            p.productId,
            p.productName,
            b.brandName AS brand,
            p.price,
            p.isFeatured,
            pi.imagePath AS image,
            GROUP_CONCAT(DISTINCT c.categoryName) AS categories
        FROM products p
        JOIN brands b ON b.brandId = p.brandId
        JOIN (
            SELECT productId, MIN(productImageId) AS firstImageId
            FROM productImages
            GROUP BY productId
        ) firstImages ON firstImages.productId = p.productId
        JOIN productImages pi ON pi.productImageId = firstImages.firstImageId
        LEFT JOIN productCategories pc ON p.productId = pc.productId
        LEFT JOIN categories c ON pc.categoryId = c.categoryId
        GROUP BY p.`productId`"
        );
        $stmt->execute();

        $products = array_map(
            fn($row) => ProductDTO::fromRow($row),
            $stmt->fetchAll(PDO::FETCH_ASSOC)
        );

        return $products;
    }

    /** @return Product */
    public function getProductById(int $productId, Database $db): Product
    {
        $stmt = $db->prepare(
            "SELECT 
            p.productId,
            p.productName,
            p.description,
            p.price,
            p.isFeatured,
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

    public function createProduct(Product $product, Database $db): Product
    {
        $stmt = $db->prepare("INSERT INTO brands (brandName) VALUES (:brandName)");
        $stmt->execute(["brandName" => $product->brand]);

        $stmt = $db->prepare(
            "INSERT INTO products (productName, description, brandId, price)
            VALUES (:productName, :description, :brandId, :price)"
        );

        $stmt->execute([
            "productName" => $product->productName,
            "description" => $product->description,
            "brandId" => $db->lastInsertId(),
            "price" => $product->price
        ]);

        $product->productId = $db->lastInsertId();

        $query = "INSERT INTO productImages (productId, imagePath) VALUES ";

        $images = [];
        $parameters = [];

        foreach ($product->images as $index => $image) {
            array_push($images, "(:productId, :imagePath$index)");
            $parameters["imagePath$index"] = $image;
        }

        $query .= implode(",", $images);

        $stmt = $db->prepare($query);

        $stmt->execute([
            "productId" => $product->productId,
            ...$parameters
        ]);

        return $product;
    }
}
