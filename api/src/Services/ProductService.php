<?php

namespace Src\Services;

use Src\Core\Exceptions\ServiceException;
use Src\Models\Product;
use Src\Repositories\ProductRepository;
use TypeError;

class ProductService
{
    protected ProductRepository $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    /** @return array<Product> */
    public function getAllProducts()
    {
        return $this->productRepository->getAllProducts();
    }

    /** @return Product */
    public function getProductById(int $productId)
    {
        try {
            $product = $this->productRepository->getProductById($productId);

            if (!$product) {
                throw new ServiceException("Product not found.");
            }

            return $product;
        } catch (TypeError $e) {
            throw new ServiceException("Product not found.");
        }
    }
}
