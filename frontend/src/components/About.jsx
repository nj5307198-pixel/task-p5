export default function About() {
  return (
    <div id="about" className="text-center text-teal-600 mt-4">
      <img
        src="/profile.png"
        className="w-24 h-24 rounded-full mx-auto object-cover"
        alt="Profile"
      />
      <p className="text-md font-medium mt-2">
        I am a student currently pursuing BE Software Engineering at Chitkara
        University.
      </p>
      <hr className="w-1/12 mx-auto border-1 my-4" />
    </div>
  );
}
