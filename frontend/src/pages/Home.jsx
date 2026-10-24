import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Projects from "../components/Projects.jsx";
import FeaturedArticles from "../components/FeaturedArticles.jsx";
import FeaturedTutorials from "../components/FeaturedTutorials.jsx";
import SignupForm from "../components/SignupForm.jsx";
import Gallery from "../components/Gallery.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <FeaturedArticles />
      <FeaturedTutorials />
      <SignupForm />
      <Gallery />
    </>
  );
}