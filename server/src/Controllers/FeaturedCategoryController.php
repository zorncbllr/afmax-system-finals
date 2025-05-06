<?php

namespace Src\Controllers;

use Src\Core\App;
use Src\Repositories\FeaturedCategoryRepository;
use Src\Services\FeaturedCategoryService;

class FeaturedCategoryController
{
    protected FeaturedCategoryService $featuredCategoryService;

    public function __construct()
    {
        $this->featuredCategoryService = new FeaturedCategoryService(
            featuredCategoryRepository: new FeaturedCategoryRepository(),
            database: App::getDatabase()
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
