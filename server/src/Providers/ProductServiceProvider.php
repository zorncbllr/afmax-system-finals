<?php

namespace Src\Providers;

use Src\Core\App;
use Src\Factories\ProductDTOFactory;
use Src\Repositories\BrandRepository;
use Src\Repositories\CategoryRepository;
use Src\Repositories\InventoryRepository;
use Src\Repositories\ProductCategoryRepository;
use Src\Repositories\ProductImagesRepository;
use Src\Repositories\ProductRepository;
use Src\Services\ProductService;

class ProductServiceProvider
{
    public static function makeProductService(): ProductService
    {
        $database = App::getDatabase();

        return new ProductService(
            database: $database,
            productRepository: new ProductRepository($database),
            categoryRepository: new CategoryRepository($database),
            inventoryRepository: new InventoryRepository($database),
            productImagesRepository: new ProductImagesRepository($database),
            brandRepository: new BrandRepository($database),
            productCategoryRepository: new ProductCategoryRepository($database),
            productDTOFactory: new ProductDTOFactory(),
        );
    }
}
