<?php

namespace Src\Services;

use PDOException;
use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Factories\ProductDTOFactory;
use Src\Models\Brand;
use Src\Models\DTOs\ProductDetailsDTO;
use Src\Models\DTOs\ProductDTO;
use Src\Models\DTOs\ProductTableDTO;
use Src\Models\Product;
use Src\Repositories\BrandRepository;
use Src\Repositories\CategoryRepository;
use Src\Repositories\InventoryRepository;
use Src\Repositories\ProductCategoryRepository;
use Src\Repositories\ProductImagesRepository;
use Src\Repositories\ProductRepository;
use TypeError;

class ProductService
{
    public function __construct(
        protected Database $database,
        protected ProductRepository $productRepository,
        protected CategoryRepository $categoryRepository,
        protected ProductCategoryRepository $productCategoryRepository,
        protected InventoryRepository $inventoryRepository,
        protected ProductImagesRepository $productImagesRepository,
        protected BrandRepository $brandRepository,
        protected ProductDTOFactory $productDTOFactory
    ) {}

    /** @return array<ProductDTO> */
    public function getAllProductDTOs(): array
    {
        $products = array_map(
            fn($row) => $this->productDTOFactory->makeProductDTO($row),
            $this->productRepository->getAllProducts()
        );

        return $products;
    }

    /** @return array<ProductTableDTO> */
    public function getAllProductTableDTOs(): array
    {
        $products = array_map(
            fn($row) => $this->productDTOFactory->makeProductTableDTO($row),
            $this->productRepository->getAllProducts()
        );

        return $products;
    }

    /** @return Product */
    public function getProductDetails(int $productId): ProductDetailsDTO
    {
        $row = $this->productRepository->getProductDetails($productId);

        if (!$row) {
            throw new ServiceException("Product not found.");
        }

        $productDetails = $this->productDTOFactory->makeProductDetailsDTO($row);

        return $productDetails;
    }

    public function createProduct(Request $request)
    {
        $hashedImages = [];

        try {
            $this->database->beginTransaction();

            try {
                $brand = $this->brandRepository->createBrand($request->brand);
            } catch (PDOException $e) {

                $brand = $this->brandRepository->getBrandByName($request->brand);
            }

            $product = new Product();

            $product->productName = $request->productName;
            $product->price = $request->price;
            $product->brandId = $brand->brandId;
            $product->description = $request->description;

            $product = $this->productRepository->createProduct($product);

            $hashedImages = $this->getHashedImages($request);

            $this
                ->productImagesRepository
                ->appendImages(
                    productId: $product->productId,
                    images: array_map(fn($img) => $img["savePath"], $hashedImages)
                );

            foreach ($request->categories as $categoryName) {
                try {
                    $category = $this->categoryRepository->createCategory($categoryName);
                } catch (PDOException $_) {

                    $category = $this->categoryRepository->findCategoryByName($categoryName);
                }

                $this->productCategoryRepository->createRelationship($category, $product);
            }

            $this->inventoryRepository->createInventory($product->productId);

            $this->database->commit();
        } catch (PDOException $e) {

            $this->database->rollBack();

            foreach ($hashedImages as $uploadedImage) {
                unlink($uploadedImage['uploadPath']);
            }

            throw new ServiceException($e->getMessage());
        }
    }


    public function deleteProduct(int $productId)
    {
        $relations = $this->productCategoryRepository->getRelationships($productId);

        if (empty($relations)) {
            throw new ServiceException("Product not found.");
        }

        $product = $this->productRepository->getProductById($productId);

        $images = $this->productImagesRepository->getImagesFor($productId);

        $publicDir = parseDir(__DIR__) . "/../../public";

        foreach ($images as $image) {
            unlink($publicDir . $image->imagePath);
        }

        $this->productRepository->deleteProduct($productId);

        foreach ($relations as $relation) {
            try {
                $this->categoryRepository->deleteCategory($relation->categoryId);
            } catch (PDOException $_) {
            }
        }

        try {
            $this->brandRepository->deleteBrand($product->brandId);
        } catch (PDOException $_) {
        }
    }

    public function updateProduct(Request $request)
    {

        $product = new Product();
        $product->productId = (int) $request->params->productId;
        $product->productName = $request->productName;
        $product->price = $request->price;
        $product->description = $request->description;

        $existingImages = $request->existingImages ?? [];
        $hashedImages = [];

        try {
            $this->database->beginTransaction();

            $notIncludedImages = $this
                ->productImagesRepository
                ->getNotIncluded($product->productId, $existingImages);

            $publicDir = parseDir(__DIR__) . "/../../public";

            foreach ($notIncludedImages as $image) {
                unlink($publicDir . $image->imagePath);
            }

            if (!empty($notIncludedImages)) {
                $this
                    ->productImagesRepository
                    ->removeImages($notIncludedImages, $product->productId);
            }

            try {
                $hashedImages = $this->getHashedImages($request);
            } catch (TypeError $e) {
            }

            if (!empty($hashedImages)) {
                $this
                    ->productImagesRepository
                    ->appendImages(
                        productId: $product->productId,
                        images: array_map(fn($img) => $img["savePath"], $hashedImages),
                    );
            }

            $prevProduct = $this->productRepository->getProductById($product->productId);

            $prevBrand = $this->brandRepository->getBrandById($prevProduct->brandId);

            $brandName = $request->brand;

            if (
                $this->brandRepository->hasOtherDependants($prevBrand, $prevProduct)
                &&   $prevBrand->brandName != $brandName
            ) {

                try {
                    $brand = $this->brandRepository->createBrand($brandName);
                } catch (PDOException $e) {
                    $brand = $this->brandRepository->getBrandByName($brandName);
                }
            } else {

                try {
                    $brand = new Brand();
                    $brand->brandId = $prevBrand->brandId;
                    $brand->brandName = $brandName;

                    $this->brandRepository->updateBrand($brand);
                } catch (PDOException $e) {

                    $brand = $this->brandRepository->getBrandByName($brandName);
                }
            }

            $product->brandId = $brand->brandId;

            $this->productRepository->updateProduct($product);

            try {
                $this->brandRepository->deleteBrand($prevBrand->brandId);
            } catch (PDOException $e) {
            }

            $tobeDeleted = [];

            $prevCategories = $this
                ->productRepository
                ->getAssociatedCategories($product->productId);

            foreach ($prevCategories as $category) {
                if (!in_array($category->categoryName, $request->categories)) {
                    array_push($tobeDeleted, $category->categoryName);
                }
            }

            foreach ($tobeDeleted as $categoryName) {
                try {
                    $category = $this
                        ->categoryRepository
                        ->findCategoryByName($categoryName);

                    $this
                        ->productCategoryRepository
                        ->removeConnection($category, $prevProduct);

                    $this
                        ->categoryRepository
                        ->deleteCategory($category->categoryId);
                } catch (PDOException $_) {
                }
            }

            $prevCategories = $this
                ->productRepository
                ->getAssociatedCategories($product->productId);

            $prevCategoryNames = array_map(
                fn($category) => $category->categoryName,
                $prevCategories
            );

            $categoryNames = array_filter(
                $request->categories,
                fn($category) => !in_array($category, $prevCategoryNames)
            );

            foreach ($categoryNames as $categoryName) {
                try {
                    $category = $this
                        ->categoryRepository
                        ->createCategory($categoryName);

                    $this
                        ->productCategoryRepository
                        ->createRelationship($category, $product);
                } catch (PDOException $_) {

                    $category = $this
                        ->categoryRepository
                        ->findCategoryByName($categoryName);

                    $this
                        ->productCategoryRepository
                        ->createRelationship($category, $product);
                }
            }

            $this->database->commit();
        } catch (PDOException $e) {

            $this->database->rollBack();

            foreach ($hashedImages as $uploadedImage) {
                unlink($uploadedImage["uploadPath"]);
            }

            throw new ServiceException($e->getMessage());
        }
    }

    protected function getHashedImages(Request $request): array
    {
        $hashedImages = [];
        $images = $request->files->images;
        $uploadDir = parseDir(__DIR__) . "/../../public/images";

        if (!is_dir($uploadDir)) mkdir($uploadDir);

        for ($i = 0; $i < sizeof($images->name); $i++) {
            $hashedImageName = uniqid(more_entropy: true) . "." . end(explode(".", $images->name[$i]));
            $uploadPath = $uploadDir . "/" . $hashedImageName;

            if (move_uploaded_file($images->tmp_name[$i], $uploadPath)) {
                $imagePath = "/images/" . $hashedImageName;

                array_push($hashedImages, [
                    "uploadPath" => $uploadPath,
                    "savePath" => $imagePath
                ]);
            }
        }

        return $hashedImages;
    }
}
