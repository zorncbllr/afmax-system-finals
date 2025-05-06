<?php

namespace Src\Controllers;

use Rakit\Validation\Validator;
use Src\Core\App;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Interfaces\IResource;
use Src\Core\Request;
use Src\Repositories\CategoryRepository;
use Src\Repositories\ProductRepository;
use Src\Services\ProductService;

class ProductController implements IResource
{
    protected ProductService $productService;

    public function __construct()
    {
        $this->productService = new ProductService(
            productRepository: new ProductRepository(),
            categoryRepository: new CategoryRepository(),
            database: App::getDatabase()
        );
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
            $validator = new Validator();

            $data = [
                'productName' => $request->productName,
                'brand' => $request->brand,
                'description' => $request->description,
                'price' => $request->price,
                'categories' => $request->categories,
                'images' => $request->files->images->name,
            ];

            $rules = [
                'productName' => 'required|min:3|max:100',
                'brand'       => 'required|min:2|max:50',
                'description' => 'required|min:10|max:10000',
                'price'       => 'required|numeric|min:0.01',
                'categories'  => 'required|array|min:1',
                'categories.*' => 'required|regex:/^[a-zA-Z0-9\s]+$/|min:2|max:30',
                'images'      => 'required|array|min:1|max:5',
                'images.*'    => 'uploaded_file|max:2M|mimes:jpeg,png,gif'
            ];

            $validation = $validator->validate($data, $rules);

            if ($validation->fails()) {
                status(400);
                return json($validation->errors()->firstOfAll());
            }

            $this->productService->createProduct($request);

            status(200);
            return json(["message" => "New product has been created."]);
        } catch (ServiceException $e) {

            status(409);
            return json([
                "message" => $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, string $id) {}

    public function delete(Request $request, string $id) {}
}
