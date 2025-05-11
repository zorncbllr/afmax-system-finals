<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\ProductImage;

class ProductImagesRepository
{
    public function __construct(protected Database $database) {}

    /** @param array<string> $images */
    /** @return array<ProductImage> */
    public function getNotIncluded(int $productId, array $images): array
    {
        $query = "SELECT productImageId, imagePath FROM productImages WHERE productId = :productId";

        $parameters = [];

        foreach ($images as $index => $image) {
            $query .= " AND imagePath != :imagePath$index";
            $parameters["imagePath$index"] = $image;
        }

        $stmt = $this->database->prepare($query);

        $stmt->execute([
            "productId" => $productId,
            ...$parameters
        ]);

        return $stmt->fetchAll(PDO::FETCH_CLASS, ProductImage::class);
    }

    /** @return array<ProductImage> */
    public function getImagesFor(int $productId): array
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM productImages WHERE productId = :productId"
        );

        $stmt->execute(["productId" => $productId]);

        return $stmt->fetchAll(PDO::FETCH_CLASS, ProductImage::class);
    }

    /** @param array<string> $images */
    public function appendImages(int $productId, array $images)
    {
        $query = "INSERT INTO productImages (productId, imagePath) VALUES ";

        $keys = [];
        $parameters = [];

        foreach ($images as $index => $image) {
            array_push($keys, "(:productId, :imagePath$index)");
            $parameters["imagePath$index"] = $image;
        }

        $query .= implode(",", $keys);

        $stmt = $this->database->prepare($query);

        $stmt->execute([
            "productId" => $productId,
            ...$parameters
        ]);
    }


    /** @param array<ProductImage> $images */
    public function removeImages(array $images, int $productId)
    {
        $query = "DELETE FROM productImages WHERE productId = :productId";

        $parameters = [];
        foreach ($images as $index => $image) {
            $parameters["imagePath$index"] = $image->imagePath;
        }

        $keys = array_map(fn($key) => ":$key", array_keys($parameters));

        $query .= " AND imagePath IN (" . implode(",", $keys) . ")";

        $stmt = $this->database->prepare($query);

        $stmt->execute([
            "productId" => $productId,
            ...$parameters
        ]);
    }
}
