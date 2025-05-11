<?php

namespace Src\Controllers;

use Src\Core\App;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Providers\FeaturedServiceProvider;
use Src\Services\FeaturedService;

class FeaturedController
{
    protected FeaturedService $featuredCategoryService;

    public function __construct()
    {
        $this->featuredCategoryService = FeaturedServiceProvider::makeFeaturedService();
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
            $value = $request->body->value;

            $this->featuredCategoryService->setFeatured(
                productId: $request->body->productId,
                value: $value
            );

            status(200);
            return json([
                "message" => $value ? "Product has been featured." : "Product removed from featured."
            ]);
        } catch (ServiceException $e) {

            status(409);
            return json(["message" => "Unable to feature product."]);
        }
    }
}
