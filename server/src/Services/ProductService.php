<?php

namespace Src\Services;

use PDOException;
use Rakit\Validation\Validator;
use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Models\CategoryDTO;
use Src\Models\Product;
use Src\Repositories\CategoryRepository;
use Src\Repositories\ProductRepository;
use TypeError;

class ProductService
{

    public function __construct(
        protected ProductRepository $productRepository,
        protected CategoryRepository $categoryRepository,
        protected Database $database,

    ) {
        $this->productRepository = $productRepository;
        $this->database = $database;
        $this->categoryRepository = $categoryRepository;
    }

    /** @return array<Product> */
    public function getAllProducts(): array
    {
        return $this->productRepository->getAllProducts($this->database);
    }

    /** @return Product */
    public function getProductById(int $productId): Product
    {
        try {
            $product = $this->productRepository->getProductById($productId, $this->database);

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
        try {
            $validator = new Validator();

            $data = [
                'productName' => $request->productName,
                'brand' => $request->brand,
                'description' => $request->description,
                'price' => $request->price,
                'categories' => $request->categories,
                'images' => $request->files->images->name,
            ];

            $rules = [
                'productName' => 'required|min:3|max:100',
                'brand'       => 'required|min:2|max:50',
                'description' => 'required|min:10|max:10000',
                'price'       => 'required|numeric|min:0.01',
                'categories'  => 'required|array|min:1',
                'categories.*' => 'required|regex:/^[a-zA-Z0-9\s]+$/|min:2|max:30',
                'images'      => 'required|array|min:1|max:5',
                'images.*'    => 'uploaded_file|max:2M|mimes:jpeg,png,gif'
            ];

            $validation = $validator->validate($data, $rules);

            if ($validation->fails()) {
                return $validation->errors()->firstOfAll();
            }

            $product = new Product();

            $product->productName = $request->productName;
            $product->brand = $request->brand;
            $product->price = $request->price;
            $product->description = $request->description;
            $product->categories = $request->categories;
            $product->images = [];

            $images = $request->files->images;

            $uploadDir = parseDir(__DIR__) . "/../../public/images";

            if (!is_dir($uploadDir)) mkdir($uploadDir);

            for ($i = 0; $i < sizeof($images->name); $i++) {
                $uploadPath = $uploadDir . "/" . $images->name[$i];

                if (move_uploaded_file($images->tmp_name[$i], $uploadPath)) {
                    $imagePath = "/images/" . $images->name[$i];

                    array_push($product->images, $imagePath);
                }
            }

            $this->database->beginTransaction();

            $product = $this->productRepository->createProduct($product, $this->database);

            foreach ($product->categories as $categoryName) {
                $category = new CategoryDTO();
                $category->categoryName = $categoryName;

                $category = $this->categoryRepository->createCategory($category, $product, $this->database);

                $this->categoryRepository->connectCategoryToProduct($category, $product, $this->database);
            }

            $this->database->commit();
        } catch (PDOException $e) {

            $this->database->rollBack();

            for ($i = 0; $i < sizeof($images->name); $i++) {
                $uploadPath = $uploadDir . "/" . $images->name[$i];

                unlink($uploadPath);
            }

            throw new ServiceException($e->getMessage());
        }
    }
}
