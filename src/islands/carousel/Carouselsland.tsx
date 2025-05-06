import { useState } from "react";
import type { CarouselImages } from "../../types";
import CarouselButton from "./CarouselButton";
import Indicator from "./Indicator";

export default function CarouselIsland({
  images,
}: {
  images: CarouselImages[];
}) {
  const [current, setCurrent] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const changeImage = (nextIndex: number) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrent(nextIndex);
      setIsFading(false);
    }, 200);
  };

  const prev = () => changeImage((current - 1 + images.length) % images.length);
  const next = () => changeImage((current + 1) % images.length);

  return (
    <div className="flex items-center justify-end gap-4 w-full my-6">
      <CarouselButton onClick={prev} direction="left" alt="Previous slide" />

      <div className="flex flex-col items-center gap-4">
        <img
          src={images[current].src}
          alt={images[current].alt}
          className={`w-1/2 sm:w-[60%] lg:w-[18.5rem] transition-all duration-200 ease-out ${
            isFading ? "opacity-30" : "opacity-100"
          }`}
        />
        <Indicator images={images} current={current} />
      </div>

      <CarouselButton onClick={next} direction="right" alt="Next slide" />
    </div>
  );
}
