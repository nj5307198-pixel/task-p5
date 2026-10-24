export default function Hero() {
  return (
    <div className="relative group">
      <img
        src="/cover.png"
        className="w-screen h-90 object-cover block"
        alt="Full width cover"
      />
      <div
        className="absolute bottom-0 w-full bg-black/50 text-white text-center p-2
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Hey, I'm MADHUR JAIN
      </div>
    </div>
  );
}
