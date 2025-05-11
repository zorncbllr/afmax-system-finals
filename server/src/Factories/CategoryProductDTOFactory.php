<?php

namespace Src\Factories;

use Src\Models\DTOs\CategoryProductDTO;

class CategoryProductDTOFactory
{
    public function __construct(protected ProductDTOFactory $productDTOFactory) {}

    public function makeCategoryProductDTO(array $row): CategoryProductDTO
    {
        $category = new CategoryProductDTO();

        $category->categoryId = $row[0]["categoryId"];
        $category->categoryName = $row[0]["categoryName"];

        $category->products = [];

        foreach ($row as $productRow) {
            $productDTO = $this->productDTOFactory->makeProductDTO($productRow);

            array_push($category->products, $productDTO);
        }

        return $category;
    }
}
