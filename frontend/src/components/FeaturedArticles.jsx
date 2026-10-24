import articles from "../data/articles";
import ArticleCard from "./ArticleCard";

export default function FeaturedArticles() {
  return (
    <section id="articles" className="text-center mt-12 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Featured Articles
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <button className="mt-6 px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors">
        See all articles
      </button>
    </section>
  );
}
