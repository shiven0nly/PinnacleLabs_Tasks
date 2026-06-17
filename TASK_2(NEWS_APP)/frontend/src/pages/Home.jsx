import Advertise from './Advertise';
import PostCard from '@/components/ui/PostCard';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Newspaper,
  Users,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts?limit=6');

      const data = await res.json();

      if (res.ok) {
        setPosts(data.posts);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const res = await fetch('/api/news/latest?category=general&limit=3');
        const data = await res.json();

        if (res.ok && data.data) {
          setTrendingNews(data.data);
        }
      } catch (error) {
        console.error('Error fetching trending news:', error);
      }
    };

    fetchTrendingNews();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary">
          Welcome to <span className="text-destructive">News App</span>
        </h1>

        <p className="text-muted-foreground mt-3 text-lg">
          Your trusted source for the latest headlines, in-depth analysis, and
          breaking news every morning.
        </p>

        <p className="text-muted-foreground mt-1 italic">
          Stay informed, stay ahead.
        </p>

        <Link to={'/news-articles'}>
          <Button className="bg-accent hover:bg-accent/80 text-accent-foreground py-3 px-6 rounded-full font-semibold shadow-lg flex items-center gap-2 w-fit">
            View all posts <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Trending News Section */}
      {trendingNews.length > 0 && (
        <section className="pb-12 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">
                Trending News
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {trendingNews.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
                >
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
                        <Newspaper className="h-12 w-12 text-primary/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-primary font-semibold mb-2">
                      {article.source}
                    </p>
                    <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center">
              <Link to="/news-articles">
                <Button variant="outline" className="gap-2">
                  View All News Articles
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="pb-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-foreground text-center">
            Why You'll Love News App
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Diverse Content"
              description="Explore news on a variety of topics, from technology to lifestyle, all curated for you."
              icon={<Newspaper className="h-12 w-12 text-primary" />}
            />

            <FeatureCard
              title="Community Driven"
              description="Connect with writers and readers who share your interests and passions."
              icon={<Users className="h-12 w-12 text-primary" />}
            />

            <FeatureCard
              title="Easy to Use"
              description="A seamless platform for sharing and discovering great content effortlessly."
              icon={<Sparkles className="h-12 w-12 text-primary" />}
            />
          </div>
        </div>
      </section>

      <div className="p-3 bg-background">
        <Advertise />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Posts</h2>

            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <Link
              to={'/search'}
              className="text-lg hover:underline text-center font-semibold"
            >
              View all news
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="group p-8 bg-card rounded-xl border border-border hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default Home;
