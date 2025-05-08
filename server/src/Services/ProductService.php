<?php

namespace Src\Services;

use PDOException;
use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Models\CategoryDTO;
use Src\Models\Product;
use Src\Repositories\CategoryRepository;
use Src\Repositories\InventoryRepository;
use Src\Repositories\ProductCategoryRepository;
use Src\Repositories\ProductRepository;
use TypeError;

class ProductService
{
    protected ProductRepository $productRepository;
    protected CategoryRepository $categoryRepository;
    protected ProductCategoryRepository $pivotRepository;
    protected InventoryRepository $inventoryRepository;

    public function __construct(
        protected Database $database,
    ) {
        $this->productRepository = new ProductRepository($this->database);
        $this->categoryRepository = new CategoryRepository($this->database);
        $this->pivotRepository = new ProductCategoryRepository($this->database);
        $this->inventoryRepository = new InventoryRepository($this->database);
    }

    /** @return array<Product> */
    public function getAllProducts(): array
    {
        return $this->productRepository->getAllProducts();
    }

    /** @return Product */
    public function getProductById(int $productId): Product
    {
        try {
            $product = $this->productRepository->getProductById($productId);

            if (!$product) {
                throw new ServiceException("Product not found.");
            }

            return $product;
        } catch (TypeError $e) {
            throw new ServiceException("Product not found.");
        }
    }

    public function createProduct(Request $request)
    {
        $uploadDir = parseDir(__DIR__) . "/../../public/images";
        $hashedImages = [];

        $product = new Product();

        $product->productName = $request->productName;
        $product->brand = $request->brand;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->categories = $request->categories;
        $product->images = [];

        $images = $request->files->images;

        if (!is_dir($uploadDir)) mkdir($uploadDir);

        for ($i = 0; $i < sizeof($images->name); $i++) {
            $hashedImageName = uniqid(more_entropy: true) . "." . end(explode(".", $images->name[$i]));
            $uploadPath = $uploadDir . "/" . $hashedImageName;

            if (move_uploaded_file($images->tmp_name[$i], $uploadPath)) {
                $imagePath = "/images/" . $hashedImageName;

                array_push($product->images, $imagePath);
                array_push($hashedImages, $uploadPath);
            }
        }

        try {
            $this->database->beginTransaction();

            $product = $this->productRepository->createProduct($product);

            foreach ($product->categories as $categoryName) {
                try {
                    $category = $this->categoryRepository->createCategory($categoryName);
                } catch (PDOException $_) {
                    $category = $this->categoryRepository->findCategoryByName($categoryName);
                }

                $this->categoryRepository->connectCategoryToProduct($category, $product);
            }

            $this->inventoryRepository->createInventoryFor($product);

            $this->database->commit();
        } catch (PDOException $e) {

            $this->database->rollBack();

            foreach ($hashedImages as $uploadedImage) {
                unlink($uploadedImage);
            }

            throw new ServiceException("Failed to create new product.");
        }
    }


    public function deleteProduct(int $productId)
    {
        $relations = $this->pivotRepository->getRelationshipsWith($productId);

        if (empty($relations)) {
            throw new ServiceException("Product not found.");
        }

        $product = $this->productRepository->getProductById($productId);

        $publicDir = parseDir(__DIR__) . "/../../public/";

        foreach ($product->images as $image) {
            unlink($publicDir . $image);
        }

        $this->productRepository->deleteProduct($productId);

        foreach ($relations as $relation) {
            try {
                $this->categoryRepository->deleteCategory($relation->categoryId);
            } catch (PDOException $_) {
            }
        }
    }
}
