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
    public function getProductImages(Product $product): array
    {
        $stmt = $this->database->prepare(
            "SELECT 
                productImageId as imageId,
                imagePath as image 
            FROM productImages 
            WHERE productId = :productId"
        );

        $stmt->execute(["productId" => $product->productId]);

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

    public function detachImagesFrom(Product $product)
    {
        $stmt = $this->database->prepare(
            "DELETE FROM productImages WHERE productId = :productId"
        );

        $stmt->execute(["productId" => $product->productId]);
    }
}
