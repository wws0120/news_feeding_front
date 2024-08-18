'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Category } from '../types/types';

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  handleCategoryChange: (category: string | null) => void;
}

function Categories({
  categories,
  selectedCategory,
  handleCategoryChange,
}: CategoriesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateCategory = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    router.push(`/?${params.toString()}`);
    handleCategoryChange(category);
  };

  return (
    <div className="w-full flex flex-wrap justify-start items-center gap-2 pb-6">
      <button
        className={`font-medium px-4 py-1 rounded-md ${
          selectedCategory === null
            ? 'bg-teal-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => updateCategory(null)}
      >
        All
      </button>
      {categories && categories.map((category: Category) => (
        <button
          key={category.id}
          className={`font-medium px-4 py-1 rounded-md ${
            selectedCategory === category.id.toString()
              ? 'bg-teal-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => updateCategory(category.id.toString())}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default Categories;
