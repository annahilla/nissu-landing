import type { CarouselImages } from "../../types";

interface IndicatorProps {
  images: CarouselImages[];
  current: number;
  setCurrent: (value: number) => void;
}

export default function Indicator({
  images,
  current,
  setCurrent,
}: IndicatorProps) {
  const progressSteps = images.map((_, index) => (
    <button
      onClick={() => setCurrent(index)}
      key={index}
      className={`${
        current === index ? "w-8 bg-brown" : "w-2"
      } transition-all ease-out duration-500 border border-2 h-2 border-brown rounded-full cursor-pointer`}
    ></button>
  ));

  return <div className="flex gap-2">{progressSteps}</div>;
}
