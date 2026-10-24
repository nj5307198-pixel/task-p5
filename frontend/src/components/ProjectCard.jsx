export default function ProjectCard({ project }) {
  return (
    <div className="flex items-center gap-4 w-full max-w-xl mx-auto border border-teal-200 rounded-lg p-3 text-left mt-4 first:mt-0">
      <img
        src={project.image}
        className="w-64 h-40 object-cover rounded-lg flex-none"
        alt={project.title}
      />
      <div>
        <p className="font-semibold text-lg">{project.title}</p>
        <p className="text-teal-600">{project.description}</p>
        {project.link && (
          <a
            href={project.link}
            className="text-sky-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
