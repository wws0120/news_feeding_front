'use server';

import { Article, Category } from '../types/types';
import pool from '../lib/db';

export async function fetchNews({
  cursor = null,
  limit = 20,
  category = null,
}: {
  cursor?: string | null;
  limit?: number;
  category?: number | null;
}) {
  const { articles, nextCursor, hasMore } = await getNews(cursor, limit, category);
  return { articles, nextCursor, hasMore };
}


export async function getNews(
  cursor: string | null = null,
  limit: number = 20,
  categoryId: number | null = null
) {
  try {
    let query: string;
    let values: any[];
    const fetchLimit = limit + 1;
    console.log('getnews',cursor,categoryId)
    if (cursor) {
      const [cursorDate, cursorId] = cursor.split('_');
      if (categoryId) {
        query = `
          SELECT a.id, a.title, a.url, a.image, a.source, c.name as category, a.published_at as "publishedAt"
          FROM articles a
          JOIN categories c ON a.category_id = c.id
          WHERE a.category_id = $1 AND (a.published_at, a.id) < ($2, $3)
          ORDER BY a.published_at DESC, a.id DESC
          LIMIT $4
        `;
        values = [categoryId, new Date(cursorDate), cursorId, fetchLimit];
      } else {
        query = `
          SELECT a.id, a.title, a.url, a.image, a.source, c.name as category, a.published_at as "publishedAt"
          FROM articles a
          JOIN categories c ON a.category_id = c.id
          WHERE (a.published_at, a.id) < ($1, $2)
          ORDER BY a.published_at DESC, a.id DESC
          LIMIT $3
        `;
        values = [new Date(cursorDate), cursorId, fetchLimit];
      }
    } else if (categoryId) {
      query = `
        SELECT a.id, a.title, a.url, a.image, a.source, c.name as category, a.published_at as "publishedAt"
        FROM articles a
        JOIN categories c ON a.category_id = c.id
        WHERE a.category_id = $1
        ORDER BY a.published_at DESC, a.id DESC
        LIMIT $2
      `;
      values = [categoryId, fetchLimit];
    } else {
      query = `
        SELECT a.id, a.title, a.url, a.image, a.source, c.name as category, a.published_at as "publishedAt"
        FROM articles a
        JOIN categories c ON a.category_id = c.id
        ORDER BY a.published_at DESC, a.id DESC
        LIMIT $1
      `;
      values = [fetchLimit];
    }

    const result = await pool.query(query, values);
    let articles = result.rows as Article[];
    const hasMore = articles.length > limit;
    
    if (hasMore) {
      articles = articles.slice(0, limit);
    }
    
    const nextCursor = hasMore
      ? `${articles[articles.length - 1].publishedAt}_${articles[articles.length - 1].id}` 
      : null;

    return { articles, nextCursor , hasMore};
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { articles: [], nextCursor: null, hasMore: false  };
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const query = `
      SELECT id, name
      FROM categories
      ORDER BY name
    `;

    const result = await pool.query(query);
    return result.rows as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
