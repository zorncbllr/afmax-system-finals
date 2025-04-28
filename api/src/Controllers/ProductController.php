<?php

namespace Src\Controllers;

use Src\Core\Interfaces\IResource;
use Src\Core\Request;
use Src\Repositories\ProductRepository;

class ProductController implements IResource
{
    protected ProductRepository $productRepository;

    public function __construct()
    {
        $this->productRepository = new ProductRepository();
    }

    public function getAll(Request $request)
    {
        $products = $this->productRepository->getAllProducts();

        status(200);
        return json($products);
    }

    public function getById(Request $request, string $id) {}

    public function create(Request $request) {}

    public function update(Request $request, string $id) {}

    public function delete(Request $request, string $id) {}
}
