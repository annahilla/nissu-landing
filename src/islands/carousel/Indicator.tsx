import type { CarouselImages } from "../../types";

export default function Indicator({
  images,
  current,
}: {
  images: CarouselImages[];
  current: number;
}) {
  const progressSteps = images.map((_, index) => (
    <div
      key={index}
      className={`${
        current === index ? "w-8 bg-brown" : "w-2"
      } transition-all ease-out duration-500 border border-2 h-2 border-brown rounded-full`}
    ></div>
  ));

  return <div className="flex gap-2">{progressSteps}</div>;
}
