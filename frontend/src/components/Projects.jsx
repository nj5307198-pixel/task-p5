import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: "p1",
    title: "BMI Calculator",
    description: "It takes the weight input and shows the category.",
    image: "/bmi-project.png",
  },
  {
    id: "p2",
    title: "Grade Checker",
    description: "It tells the grade obtained by the marks.",
    image: "/grade-project.png",
    link: "https://github.com/nj5307198-pixel/gradechecker/blob/main/Exercise1.c",
  },
];

export default function Projects() {
  return (
    <div id="work" className="text-center text-teal-600">
      <p className="text-2xl mt-8">Here's what I've done so far</p>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <hr className="w-1/12 mx-auto border-1 my-4" />
    </div>
  );
}
