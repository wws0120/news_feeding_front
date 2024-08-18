import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsList from '../components/NewsList';
import { fetchNews, getCategories } from '../actions/actions';
import { Article, Category } from '../types/types';

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  const category =
    typeof searchParams.category === 'string'
      ? parseInt(searchParams.category, 10)
      : null;
  const { articles, nextCursor } = await fetchNews({ category });
  const categories = await getCategories();

  console.log('initialArticles',articles)

  return (
    <div>
      <Head>
        <title>My Blog | Explore the new horizon</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="bg-black">
        <Header />
        <NewsList
          initialArticles={articles}
          initialNextCursor={nextCursor}
          categories={categories}
          selectedCategory={category}
        />
        <Footer />
      </main>
    </div>
  );
}
