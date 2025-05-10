<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\Product;
use Src\Models\ProductImage;

class ProductImagesRepository
{
    public function __construct(protected Database $database) {}

    /** @return array<ProductImage> */
    public function getNotIncluded(Product $product): array
    {
        $query = "SELECT productImageId as imageId, imagePath as image FROM productImages WHERE productId = :productId";

        $parameters = [];

        foreach ($product->images as $index => $image) {
            $query .= " AND imagePath != :imagePath$index";
            $parameters["imagePath$index"] = $image;
        }

        $stmt = $this->database->prepare($query);

        $stmt->execute([
            "productId" => $product->productId,
            ...$parameters
        ]);

        return $stmt->fetchAll(PDO::FETCH_CLASS, ProductImage::class);
    }

    public function attachImagesTo(Product $product)
    {
        $query = "INSERT INTO productImages (productId, imagePath) VALUES ";

        $images = [];
        $parameters = [];

        foreach ($product->images as $index => $image) {
            array_push($images, "(:productId, :imagePath$index)");
            $parameters["imagePath$index"] = $image;
        }

        $query .= implode(",", $images);

        $stmt = $this->database->prepare($query);

        $stmt->execute([
            "productId" => $product->productId,
            ...$parameters
        ]);
    }


    /** @param array<ProductImage> $images */
    public function removeImages(array $images, int $productId)
    {
        $query = "DELETE FROM productImages WHERE productId = :productId";

        $parameters = [];
        foreach ($images as $index => $image) {
            $parameters["imagePath$index"] = $image->image;
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
