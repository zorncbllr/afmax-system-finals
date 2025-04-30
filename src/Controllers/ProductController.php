<?php

namespace Src\Controllers;

use Src\Core\Exceptions\ServiceException;
use Src\Core\Interfaces\IResource;
use Src\Core\Request;
use Src\Repositories\ProductRepository;
use Src\Services\ProductService;

class ProductController implements IResource
{
    protected ProductService $productService;

    public function __construct()
    {
        $productRepository = new ProductRepository();
        $this->productService = new ProductService($productRepository);
    }

    public function getAll(Request $request)
    {
        $products = $this->productService->getAllProducts();

        status(200);
        return json($products);
    }

    public function getById(Request $request, string $id)
    {
        try {
            $product = $this->productService->getProductById((int) $id);

            status(200);
            return json($product);
        } catch (ServiceException $e) {

            status(404);
            return json(["message" => $e->getMessage()]);
        }
    }

    public function create(Request $request) {}

    public function update(Request $request, string $id) {}

    public function delete(Request $request, string $id) {}
}
