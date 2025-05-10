<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\Brand;
use Src\Models\Product;
use Src\Models\ProductDTO;

class ProductRepository
{
    public function __construct(protected Database $database) {}

    /** @return array<ProductDTO> */
    public function getAllProducts(): array
    {
        $stmt = $this->database->prepare(
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
        LEFT JOIN (
            SELECT productId, MIN(productImageId) AS firstImageId
            FROM productImages
            GROUP BY productId
        ) firstImages ON firstImages.productId = p.productId
        LEFT JOIN productImages pi ON pi.productImageId = firstImages.firstImageId
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
    public function getProductById(int $productId): Product
    {
        $stmt = $this->database->prepare(
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

    public function createProduct(Product $product, Brand $brand): Product
    {
        $stmt = $this->database->prepare(
            "INSERT INTO products (productName, description, brandId, price)
            VALUES (:productName, :description, :brandId, :price)"
        );

        $stmt->execute([
            "productName" => $product->productName,
            "description" => $product->description,
            "brandId" => $brand->brandId,
            "price" => $product->price
        ]);

        $product->productId = $this->database->lastInsertId();

        return $product;
    }

    public function deleteProduct(int $productId)
    {
        $stmt = $this->database->prepare("DELETE FROM products WHERE productId = :productId");
        $stmt->execute(["productId" => $productId]);
    }

    public function updateProduct(Product $product)
    {
        $stmt = $this->database->prepare(
            "UPDATE products 
            SET productName = :productName,
            price = :price,
            description = :description
            WHERE productId = :productId"
        );

        $stmt->execute([
            "productId" => $product->productId,
            "productName" => $product->productName,
            "price" => $product->price,
            "description" => $product->description,
        ]);
    }

    public function updateToNewBrand(Brand $brand, Product $product)
    {
        $stmt = $this->database->prepare(
            "UPDATE products
            SET brandId = :brandId
            WHERE productId = :productId"
        );

        $stmt->execute([
            "productId" => $product->productId,
            "brandId" => $brand->brandId
        ]);
    }
}
