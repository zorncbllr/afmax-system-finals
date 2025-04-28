<?php

namespace Src\Repositories;

use PDO;
use Src\Core\App;
use Src\Models\Product;
use Src\Models\ProductImage;

class ProductImageRepository
{
    /** @return array<ProductImage> */
    public function getAttachedProductImages(Product $product)
    {
        $db = App::getDatabase();

        $stmt = $db->prepare(
            "select productImageId, imagePath from productImages 
            where productId = :productId"
        );

        $stmt->execute(["productId" => $product->productId]);

        return $stmt->fetchAll(PDO::FETCH_CLASS, ProductImage::class);
    }


    /** @param Product $product
     * @param array<ProductImage> $productImages
     */
    public function attachProductImages(Product $product, array $productImages)
    {
        $db = App::getDatabase();

        $values = implode(", ", array_map(
            fn($image) => "(:productId, :imagePath{$image->productImageId})",
            $productImages
        ));

        $stmt = $db->prepare("insert into productImages (productId, imagePath) values ($values)");

        $parameters = [];

        foreach ($productImages as $image) {
            $parameters["imagePath{$image->productImageId}"] = $image->imagePath;
        }

        $stmt->execute($parameters);
    }
}
