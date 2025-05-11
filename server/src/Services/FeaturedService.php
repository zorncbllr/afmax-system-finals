<?php

namespace Src\Services;

use PDOException;
use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Models\Category;
use Src\Models\ProductDTO;
use Src\Repositories\FeaturedRepository;

class FeaturedService
{
    protected FeaturedRepository $featuredCategoryRepository;

    public function __construct(
        protected Database $database
    ) {
        $this->featuredCategoryRepository = new FeaturedRepository($this->database);
    }

    /** @return array<Category> */
    public function getAllFeatured(int $categoryLimit, int $productsLimit): array
    {
        $rawCategoryProducts = $this->featuredCategoryRepository
            ->getAllFeatured($categoryLimit, $productsLimit);

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

    public function setFeatured(int $productId, bool $value)
    {
        try {
            $this->featuredCategoryRepository->setFeatured($productId, $value);
        } catch (PDOException $e) {
            status(400);
            json($e->getMessage());
        }
    }
}
