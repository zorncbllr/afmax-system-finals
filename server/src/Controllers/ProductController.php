<?php

namespace Src\Controllers;

use Src\Core\App;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Interfaces\IResource;
use Src\Core\Request;
use Src\Services\ProductService;

class ProductController implements IResource
{
    protected ProductService $productService;

    public function __construct()
    {
        $this->productService = new ProductService(database: App::getDatabase());
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

    public function create(Request $request)
    {
        try {
            $this->productService->createProduct($request);

            status(200);
            return json([
                "message" => "New product has been created.",
                "description" => "You can now manage it from the product list."
            ]);
        } catch (ServiceException $e) {

            status(409);
            return json([
                "message" => $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        status(200);
        return json($request);
    }

    public function delete(Request $request, string $id)
    {
        try {
            $this->productService->deleteProduct((int) $id);

            status(200);
            return json([
                "message" => "Product has been removed.",
                "description" => "This action cannot be undone."
            ]);
        } catch (ServiceException $e) {

            status(400);
            return json($e->getMessage());
        }
    }
}
