<?php

namespace Src\Providers;

use Src\Core\App;
use Src\Factories\CategoryProductDTOFactory;
use Src\Factories\ProductDTOFactory;
use Src\Repositories\CategoryRepository;
use Src\Services\CategoryService;

class CategoryServiceProvider
{
    public static function makeCategoryService(): CategoryService
    {
        $database = App::getDatabase();

        return new CategoryService(
            database: $database,
            categoryRepository: new CategoryRepository($database),
            categoryProductDTOFactory: new CategoryProductDTOFactory(
                new ProductDTOFactory()
            )
        );
    }
}
