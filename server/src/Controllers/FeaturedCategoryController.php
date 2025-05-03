<?php

namespace Src\Controllers;

use Src\Repositories\FeaturedCategoryRepository;
use Src\Services\FeaturedCategoryService;

class FeaturedCategoryController
{
    protected FeaturedCategoryService $featuredCategoryService;

    public function __construct()
    {
        $featuredCategoryRepository = new FeaturedCategoryRepository();

        $this->featuredCategoryService = new FeaturedCategoryService(
            featuredCategoryRepository: $featuredCategoryRepository
        );
    }

    public function getAllFeaturedCategoryProducts()
    {
        $featuredCategoryProducts = $this->featuredCategoryService
            ->getFeaturedCategoryProducts(
                categoryLimit: 3,
                productsLimit: 9
            );

        status(200);
        return json($featuredCategoryProducts);
    }
}
