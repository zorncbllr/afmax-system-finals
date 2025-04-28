<?php

namespace Src\Repositories;

use PDO;
use Src\Core\App;
use Src\Models\Product;

class ProductRepository
{
    /** @return array<Product> */
    public function getAllProducts()
    {
        $db = App::getDatabase();

        $stmt = $db->prepare("select * from products");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS, Product::class);
    }


    /** @return Product|null */
    public function getProductById(int $productId)
    {
        $db = App::getDatabase();

        $stmt = $db->prepare("select * from products where productId = :productId");

        $stmt->execute(["productId" => $productId]);

        return $stmt->fetchObject(Product::class);
    }

    /** @return void */
    public function createProduct(Product $product)
    {
        $db = App::getDatabase();

        $stmt = $db->prepare(
            "insert into products (productName, description, brand, price)
            values (:productName, :description, :brand, :price)"
        );

        $stmt->execute([
            "productName" => $product->productName,
            "description" => $product->description,
            "brand" => $product->brand,
            "price" => $product->price
        ]);
    }

    /** @return void */
    public function deleteProduct(int $productId)
    {
        $db = App::getDatabase();

        $stmt = $db->prepare("delete from products where productId = :productId");

        $stmt->execute(["productId" => $productId]);
    }
}
