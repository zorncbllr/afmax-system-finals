<?php

namespace Src\Controllers;

use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Providers\ProductServiceProvider;
use Src\Services\ProductService;

class ProductController
{
    protected ProductService $productService;

    public function __construct()
    {
        $this->productService = ProductServiceProvider::makeProductService();
    }

    public function getProductDTOs()
    {
        $products = $this->productService->getAllProductDTOs();

        status(200);
        return json($products);
    }

    public function getProductTableDTOs()
    {
        $products = $this->productService->getAllProductTableDTOs();

        status(200);
        return json($products);
    }

    public function getProductDetails(string $productId)
    {
        try {
            $product = $this->productService->getProductDetails((int) $productId);

            status(200);
            return json($product);
        } catch (ServiceException $e) {

            status(404);
            return json(["message" => $e->getMessage()]);
        }
    }

    public function createProduct(Request $request)
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

    public function updateProduct(Request $request)
    {
        try {
            $this->productService->updateProduct($request);

            status(200);
            return json([
                "message" => "Product has been updated",
                "description" => "You can now see updated product details."
            ]);
        } catch (ServiceException $e) {

            status(400);
            return json([
                "message" => $e->getMessage()
            ]);
        }
    }

    public function deleteProduct(Request $request, string $productId)
    {
        try {
            $this->productService->deleteProduct((int) $productId);

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
