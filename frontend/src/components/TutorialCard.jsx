import { Star } from "lucide-react";

export default function TutorialCard({ tutorial }) {
  return (
    <div className="w-64 rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white text-left hover:shadow-md transition-shadow">
      <img
        src={tutorial.image}
        alt={tutorial.name}
        className="w-full h-36 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-lg text-gray-800">{tutorial.name}</h3>
        <p className="text-sm text-gray-500">{tutorial.description}</p>
        <hr className="my-2 border-gray-200" />
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{tutorial.rating}</span>
          <span className="text-gray-500">{tutorial.username}</span>
        </div>
      </div>
    </div>
  );
}
