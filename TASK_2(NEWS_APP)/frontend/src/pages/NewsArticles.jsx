import React, { useEffect, useState } from 'react';
import { Newspaper, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NewsArticles = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');
  const [page, setPage] = useState(1);

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Health' },
    { value: 'science', label: 'Science' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
  ];

  useEffect(() => {
    fetchNews();
  }, [category, page]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      // Use backend proxy to keep API key secure
      const response = await fetch(
        `/api/news/latest?category=${category}&page=${page}&limit=12`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch news');
      }

      if (data.data) {
        setNews(data.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Latest News</h1>
          </div>
          <p className="text-lg opacity-90">
            Stay updated with breaking news from around the world
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-muted/30 border-b sticky top-16 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                onClick={() => {
                  setCategory(cat.value);
                  setPage(1);
                }}
                variant={category === cat.value ? 'default' : 'outline'}
                className="whitespace-nowrap"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading news articles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-destructive mb-2">
                Error Loading News
              </h3>
              <p className="text-muted-foreground">{error}</p>
              <Button onClick={fetchNews} className="mt-4">
                Try Again
              </Button>
            </div>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
            <p className="text-muted-foreground">
              Try selecting a different category
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article, index) => (
                <NewsCard
                  key={index}
                  article={article}
                  formatDate={formatDate}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-12">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                variant="outline"
              >
                Previous
              </Button>
              <span className="flex items-center px-4 font-medium">
                Page {page}
              </span>
              <Button
                onClick={() => setPage((p) => p + 1)}
                disabled={news.length < 12}
                variant="outline"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const NewsCard = ({ article, formatDate }) => {
  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <Newspaper className="h-16 w-16 text-primary/30" />
          </div>
        )}
        {article.category && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase">
              {article.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Source & Date */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          {article.source && (
            <span className="font-medium text-primary">{article.source}</span>
          )}
          {article.published_at && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(article.published_at)}</span>
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
          {article.description || 'No description available.'}
        </p>

        {/* Read More Link */}
        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mt-auto"
          >
            Read Full Article
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
};
