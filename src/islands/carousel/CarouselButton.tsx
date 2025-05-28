interface CarouselButtonProps {
  onClick: () => void;
  direction: "left" | "right";
  alt: string;
}

export default function CarouselButton({
  onClick,
  direction,
  alt,
}: CarouselButtonProps) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 mx-2 flex items-center justify-center text-brown border-brown border-2 p-2 md:p-3 rounded-full cursor-pointer hover:opacity-70"
    >
      <img
        className="w-4 md:w-5"
        src={`/images/chevron-${direction}.svg`}
        alt={alt}
      />
    </button>
  );
}
