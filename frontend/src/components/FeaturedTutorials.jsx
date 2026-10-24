import tutorials from "../data/tutorials";
import TutorialCard from "./TutorialCard";

export default function FeaturedTutorials() {
  return (
    <section id="tutorials" className="text-center mt-12 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Featured Tutorials
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
      <button className="mt-6 px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors">
        See all tutorials
      </button>
    </section>
  );
}
