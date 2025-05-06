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

    public function __construct(
        protected CategoryRepository $categoryRepository,
        protected Database $database
    ) {}

    /** @return array<CategoryDTO> */
    public function getAllCategories(): array
    {
        return $this->categoryRepository->getAllCategories($this->database);
    }

    /** @return Category */
    public function getCategoryById(int $categoryId): Category
    {
        try {
            $category = $this->categoryRepository->getCategoryById($categoryId, $this->database);

            if (!$category) {
                throw new ServiceException("Category not found.");
            }

            return $category;
        } catch (TypeError $e) {
            throw new ServiceException("Category not found.");
        }
    }
}
