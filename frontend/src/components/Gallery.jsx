const photos = [
  { id: "ph1", src: "/photo1.png", alt: "Photo 1" },
  { id: "ph2", src: "/photo2.png", alt: "Photo 2" },
  { id: "ph3", src: "/photo3.png", alt: "Photo 3" },
  { id: "ph4", src: "/photo4.png", alt: "Photo 4" },
];

export default function Gallery() {
  return (
    <div>
      <p className="text-2xl mt-8 text-center text-teal-600">My photos</p>
      <div className="flex flex-wrap justify-center gap-2 mt-4 mb-10">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.src}
            className="w-64 h-40 object-cover rounded-lg"
            alt={photo.alt}
          />
        ))}
      </div>
    </div>
  );
}
