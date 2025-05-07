<?php

namespace Src\Services;

use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Models\Category;
use Src\Models\CategoryDTO;
use Src\Repositories\CategoryRepository;
use TypeError;

class CategoryService
{
    protected CategoryRepository $categoryRepository;

    public function __construct(
        protected Database $database
    ) {
        $this->categoryRepository = new CategoryRepository($this->database);
    }

    /** @return array<CategoryDTO> */
    public function getAllCategories(): array
    {
        return $this->categoryRepository->getAllCategories();
    }

    /** @return Category */
    public function getCategoryById(int $categoryId): Category
    {
        try {
            $category = $this->categoryRepository->getCategoryById($categoryId);

            if (!$category) {
                throw new ServiceException("Category not found.");
            }

            return $category;
        } catch (TypeError $e) {
            throw new ServiceException("Category not found.");
        }
    }
}
