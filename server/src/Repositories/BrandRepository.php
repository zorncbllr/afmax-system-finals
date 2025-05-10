<?php

namespace Src\Repositories;

use Src\Core\Database;
use Src\Models\Brand;

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

    public function createBrand(string $brandName): Brand
    {
        $brand = new Brand();
        $brand->brandName = $brandName;

        $stmt = $this->database->prepare(
            "INSERT INTO brands (brandName) VALUES (:brandName)"
        );

        $stmt->execute(["brandName" => $brand->brandName]);

        $brand->brandId = $this->database->lastInsertId();

        return $brand;
    }

    public function deleteBrandByName(string $brandName)
    {
        $stmt = $this->database->prepare(
            "DELETE FROM brands WHERE brandName = :brandName"
        );

        $stmt->execute(["brandName" => $brandName]);
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
