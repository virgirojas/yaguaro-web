import Image from "next/image";

export function ImageGallery({ images }: { images: string[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
      {images.map((src, i) => (
        <div
          key={src}
          className="relative h-64 w-80 shrink-0 snap-start overflow-hidden rounded-2xl sm:h-72 sm:w-96"
        >
          <Image
            src={src}
            alt={`Galería ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 384px"
          />
        </div>
      ))}
    </div>
  );
}
