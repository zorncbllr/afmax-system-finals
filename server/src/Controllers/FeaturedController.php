<?php

namespace Src\Controllers;

use Src\Core\App;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Services\FeaturedService;

class FeaturedController
{
    protected FeaturedService $featuredCategoryService;

    public function __construct()
    {
        $this->featuredCategoryService = new FeaturedService(database: App::getDatabase());
    }

    public function getAllFeatured()
    {
        $featuredCategoryProducts = $this->featuredCategoryService
            ->getAllFeatured(
                categoryLimit: 3,
                productsLimit: 9
            );

        status(200);
        return json($featuredCategoryProducts);
    }

    public function setFeatured(Request $request)
    {
        try {
            $this->featuredCategoryService->setFeatured(
                productId: $request->body->productId,
                value: $request->body->value
            );

            status(204);
            return json([
                "message" => "Product has been featured."
            ]);
        } catch (ServiceException $e) {

            status(409);
            return json($e->getMessage());
        }
    }
}
