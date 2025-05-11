<?php

namespace Src\Services;

use PDOException;
use Src\Core\Database;
use Src\Factories\CategoryProductDTOFactory;
use Src\Factories\ProductDTOFactory;
use Src\Models\Category;
use Src\Models\DTOs\CategoryProductDTO;
use Src\Repositories\FeaturedRepository;

class FeaturedService
{

    public function __construct(
        protected Database $database,
        protected FeaturedRepository $featuredRepository,
        protected ProductDTOFactory $productDTOFactory
    ) {}

    /** @return array<Category> */
    public function getAllFeatured(int $categoryLimit, int $productsLimit): array
    {
        $rawCategoryProducts = $this->featuredRepository
            ->getAllFeatured($categoryLimit, $productsLimit);

        $processedCategoryProducts = [];

        foreach ($rawCategoryProducts as $categoryRow) {
            $rawProducts = json_decode($categoryRow["products"], associative: true);

            $category = new CategoryProductDTO();

            $category->categoryId = $categoryRow["categoryId"];
            $category->categoryName = $categoryRow["categoryName"];
            $category->products = [];

            foreach ($rawProducts as $productRow) {
                array_push(
                    $category->products,
                    $this->productDTOFactory->makeProductDTO($productRow)
                );
            }

            array_push($processedCategoryProducts, $category);
        }

        return $processedCategoryProducts;
    }

    public function setFeatured(int $productId, bool $value)
    {
        try {
            $this->featuredRepository->setFeatured($productId, $value);
        } catch (PDOException $e) {
            status(400);
            json($e->getMessage());
        }
    }
}
