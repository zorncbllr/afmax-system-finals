import { useFeaturedStore } from "../store";

function ProductTab() {
  const { categories, activeCategory, setActiveCategory } = useFeaturedStore();

  const changeActiveTab = (index: number) => {
    console.log(index);
    setActiveCategory(index);
  };

  return (
    <div className="flex overflow-x-auto whitespace-nowrap">
      {categories.map((category, index) => (
        <>
          {category == activeCategory ? (
            <button
              onClick={() => changeActiveTab(index)}
              className="inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 border border-b-transparent border-gray-300 sm:px-4 -px-1 whitespace-nowrap focus:outline-none"
            >
              <span className="mx-1 text-base">{category.categoryName}</span>
            </button>
          ) : (
            <button
              onClick={() => changeActiveTab(index)}
              className="inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 bg-transparent border border-transparent border-b-gray-300 sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none"
            >
              <span className="mx-1 text-base">{category.categoryName}</span>
            </button>
          )}
        </>
      ))}
    </div>
  );
}

export default ProductTab;
