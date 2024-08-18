// components/NewsList.tsx
'use client';

import { useEffect, useState } from 'react';
import { getNews, getCategories } from '../actions/actions';
import { Article, Category } from '../types/types';
import NewsCard from './NewsCard';
import Categories from './Categories';

interface NewsListProps {
  initialArticles: Article[];
  initialNextCursor: string | null;
  categories: Category[];
  selectedCategory: number | null;
}

function NewsList({ initialArticles, initialNextCursor, categories,selectedCategory: initialSelectedCategory }: NewsListProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [cursor, setCursor] = useState<string | null>(initialNextCursor);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialSelectedCategory);
  const [hasMore, setHasMore] = useState(initialNextCursor !== null);

  useEffect(() => {
    loadArticlesForCategory(selectedCategory);
  }, [selectedCategory]);

  function handleCategoryChange(categoryId: string | null) {
    setSelectedCategory(categoryId);
  }

  async function loadArticlesForCategory(categoryId: string | null) {
    setLoading(true);
    setArticles([]);
    setCursor(null);
    setHasMore(true);

    try {
      const { articles: newArticles, nextCursor, hasMore: moreArticles } = await getNews(
        null,
        20,
        categoryId ? parseInt(categoryId) : null
      );
      setArticles(newArticles);
      setCursor(nextCursor);
      setHasMore(moreArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadMoreArticles() {
    if (!hasMore) return;

    setLoading(true);
    try {
      const { articles: newArticles, nextCursor, hasMore: moreArticles } = await getNews(
        cursor,
        20,
        selectedCategory ? parseInt(selectedCategory) : null
      );
      if (newArticles.length > 0) {
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
        setCursor(nextCursor);
        setHasMore(moreArticles);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="flex flex-col">
      <div className="flex flex-col relative w-full py-[70px] bg-blend-darken bg-cover">
        <div className="container mx-auto px-2 lg:px-4">
          <div className="text-center mb-10">
            <h4 className="my-1 font-semibold text-[30px] md:text-[40px] text-slate-200 dark:text-slate-200 mb-5 leading-12">
             Latest News Highlights
            </h4>
            <h6 className="text-amber-400 text-lg font-medium">
             Stay updated with the world’s most important stories at your fingertips.
            </h6>
          </div>
          
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />

          <div className="grid grid-cols-12 gap-4 mb-4">
            {articles &&articles.map((item, index) => (
              <NewsCard key={index} news={item} />
            ))}
          </div>

          <div className="w-full flex justify-center items-center mt-4">
            {loading ? (
              <div className='text-white font-semibold text-xl flex flex-col justify-center items-center py-8 '>
    
                  <div className="w-12 h-12 mb-2 border-4 border-dashed border-gray-500 rounded-full animate-spin bg-gray-700"></div>

                Loading
              </div>
            ) : hasMore ? (
              <button 
                onClick={() => loadMoreArticles(null, selectedCategory)} 
                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-25 text-white text-center rounded  transition-all"
              >
                Load More
              </button>
            ) : articles.length > 0 ? (
              <p className="py-2 px-4 bg-slate-900 text-white font-bold  opacity-50 cursor-default">No more articles to load.</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

 


export default NewsList;