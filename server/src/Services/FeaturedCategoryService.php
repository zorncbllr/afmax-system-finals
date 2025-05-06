<?php

namespace Src\Services;

use Src\Core\Database;
use Src\Models\Category;
use Src\Models\ProductDTO;
use Src\Repositories\FeaturedCategoryRepository;

class FeaturedCategoryService
{

    public function __construct(
        protected FeaturedCategoryRepository $featuredCategoryRepository,
        protected Database $database
    ) {
        $this->featuredCategoryRepository = $featuredCategoryRepository;
        $this->database = $database;
    }

    /** @return array<Category> */
    public function getFeaturedCategoryProducts(int $categoryLimit, int $productsLimit): array
    {
        $rawCategoryProducts = $this->featuredCategoryRepository
            ->getFeaturedCategoryProducts($categoryLimit, $productsLimit, $this->database);

        $processedCategoryProducts = [];

        foreach ($rawCategoryProducts as $categoryRow) {
            $rawProducts = json_decode($categoryRow["products"], associative: true);

            $category = new Category();

            $category->categoryId = $categoryRow["categoryId"];
            $category->categoryName = $categoryRow["categoryName"];
            $category->products = [];

            foreach ($rawProducts as $productRow) {
                array_push(
                    $category->products,
                    ProductDTO::fromRow($productRow)
                );
            }

            array_push($processedCategoryProducts, $category);
        }

        return $processedCategoryProducts;
    }
}
