<?php

namespace Src\Repositories;

use Src\Core\Database;
use Src\Models\Brand;
use Src\Models\Product;

class BrandRepository
{
    public function __construct(protected Database $database) {}


    public function getBrandByName(string $brandName): Brand
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM brands WHERE brandName = :brandName"
        );

        $stmt->execute(["brandName" => $brandName]);

        return $stmt->fetchObject(Brand::class);
    }

    public function getBrandById(int $brandId): Brand
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM brands WHERE brandId = :brandId"
        );

        $stmt->execute(["brandId" => $brandId]);

        return $stmt->fetchObject(Brand::class);
    }

    public function hasOtherDependants(Brand $brand, Product $product): bool
    {
        $stmt = $this->database->prepare(
            "SELECT COUNT(*) FROM products 
            WHERE brandId = :brandId 
            AND productId != :productId"
        );

        $stmt->execute([
            "brandId" => $brand->brandId,
            "productId" => $product->productId
        ]);

        return (int) $stmt->fetchColumn() > 0;
    }

    public function createBrand(string $brandName): Brand
    {
        $stmt = $this->database->prepare(
            "INSERT INTO brands (brandName) VALUES (:brandName)"
        );

        $stmt->execute(["brandName" => $brandName]);

        $brand = new Brand();

        $brand->brandName = $brandName;
        $brand->brandId = $this->database->lastInsertId();

        return $brand;
    }

    public function deleteBrand(int $brandId)
    {
        $stmt = $this->database->prepare(
            "DELETE FROM brands WHERE brandId = :brandId"
        );

        $stmt->execute(["brandId" => $brandId]);
    }

    public function updateBrand(Brand $brand)
    {
        $stmt = $this->database->prepare(
            "UPDATE brands 
            SET brandName = :brandName
            WHERE brandId = :brandId"
        );

        $stmt->execute([
            "brandId" => $brand->brandId,
            "brandName" => $brand->brandName
        ]);
    }
}
