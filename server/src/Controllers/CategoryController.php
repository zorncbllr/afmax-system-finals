<?php

namespace Src\Controllers;

use Src\Core\App;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Interfaces\IResource;
use Src\Core\Request;
use Src\Services\CategoryService;

class CategoryController implements IResource
{
    protected CategoryService $categoryService;

    public function __construct()
    {
        $this->categoryService = new CategoryService(database: App::getDatabase());
    }

    public function getAll(Request $request)
    {
        $categories = $this->categoryService->getAllCategories();

        status(200);
        return json($categories);
    }

    public function getById(Request $request, string $id)
    {
        try {
            $category = $this->categoryService->getCategoryById((int) $id);

            status(200);
            return json($category);
        } catch (ServiceException $e) {

            status(404);
            return json(["message" => $e->getMessage()]);
        }
    }

    public function create(Request $request) {}

    public function update(Request $request, string $id) {}

    public function delete(Request $request, string $id) {}
}
