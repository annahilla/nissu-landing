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
      className="shrink-0 flex items-center justify-center text-brown border border-brown border-2 p-3 rounded-full cursor-pointer hover:opacity-70"
    >
      <img className="w-5" src={`/images/chevron-${direction}.svg`} alt={alt} />
    </button>
  );
}
