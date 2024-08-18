export interface Article {
  id: string;
  title: string;
  url: string;
  image: string;
  source: string;
  category: string;
  publishedAt: string;
}

export interface Category {
  id: number;
  name: string;
}
