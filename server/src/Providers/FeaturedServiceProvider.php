<?php

namespace Src\Providers;

use Src\Core\App;
use Src\Factories\ProductDTOFactory;
use Src\Repositories\FeaturedRepository;
use Src\Services\FeaturedService;

class FeaturedServiceProvider
{
    public static function makeFeaturedService(): FeaturedService
    {
        $database = App::getDatabase();

        return new FeaturedService(
            database: $database,
            featuredRepository: new FeaturedRepository($database),
            productDTOFactory: new ProductDTOFactory()
        );
    }
}
