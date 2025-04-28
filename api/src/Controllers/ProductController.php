<?php

namespace Src\Controllers;

use Src\Repositories\ProductRepository;

class ProductController
{
    protected ProductRepository $productRepository;

    public function __construct()
    {
        $this->productRepository = new ProductRepository();
    }

    public function getAll()
    {
        $products = $this->productRepository->getAllProducts();

        status(200);
        return json($products);
    }
}
