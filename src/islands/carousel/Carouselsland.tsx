import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import type { CarouselImages } from "../../types";
import CarouselButton from "./CarouselButton";
import Indicator from "./Indicator";

interface CarouselIslandProps {
  images: CarouselImages[];
}

export default function CarouselIsland({ images }: CarouselIslandProps) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);

  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCurrent(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div className="flex items-center justify-center lg:justify-end w-full my-6">
      <CarouselButton
        onClick={scrollPrev}
        direction="left"
        alt="Previous slide"
      />

      <div className="flex flex-col items-center gap-4">
        <div className="overflow-hidden w-full md:w-82" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div className="relative min-w-full aspect-[1/2] bg-beige rounded-lg">
                <img
                  key={index}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        <Indicator
          images={images}
          current={current}
          setCurrent={(index) => embla?.scrollTo(index)}
        />
      </div>

      <CarouselButton onClick={scrollNext} direction="right" alt="Next slide" />
    </div>
  );
}
