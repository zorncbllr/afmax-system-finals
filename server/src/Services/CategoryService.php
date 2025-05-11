<?php

namespace Src\Services;

use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Factories\CategoryProductDTOFactory;
use Src\Models\DTOs\CategoryProductDTO;
use Src\Repositories\CategoryRepository;

class CategoryService
{
    public function __construct(
        protected Database $database,
        protected CategoryProductDTOFactory $categoryProductDTOFactory,
        protected CategoryRepository $categoryRepository
    ) {}

    /** @return array<CategoryDTO> */
    public function getAllCategories(): array
    {
        return $this->categoryRepository->getAllCategories();
    }

    /** @return Category */
    public function getCategoryProducts(int $categoryId): CategoryProductDTO
    {
        $rawData = $this->categoryRepository->getAssociatedProducts($categoryId);

        if (empty($rawData)) {
            throw new ServiceException("Category not found.");
        }

        $categoryProducts = $this->categoryProductDTOFactory->makeCategoryProductDTO($rawData);

        return $categoryProducts;
    }
}
