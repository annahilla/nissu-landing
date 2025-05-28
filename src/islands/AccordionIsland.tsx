import { useState } from "react";
import type { ContentItems } from "../types";

export default function AccordionIsland({ items }: { items: ContentItems[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index: number) => {
    if (openIndex === index) {
      const next = index + 1 < items.length ? index + 1 : 0;
      setOpenIndex(next);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="flex flex-col gap-2 border-2 border-brown rounded-lg p-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="overflow-hidden transition-all duration-300"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left hover:opacity-70 cursor-pointer"
              onClick={() => toggle(index)}
            >
              <span className="text-xl font-semibold">{item.title}</span>
              <img
                className="chevron-icon transition-transform duration-200"
                src={
                  isOpen ? "/images/chevron-up.svg" : "/images/chevron-down.svg"
                }
                alt="Chevron icon"
              />
            </button>

            <div
              className={`overflow-hidden px-4 ${
                isOpen
                  ? "max-h-[500px] opacity-100 transition-all duration-500 ease-in-out"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div
                className="pb-4 text-base"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>

            {index + 1 !== items.length && (
              <div className="mx-auto h-[1px] w-[95%] bg-brown" />
            )}
          </div>
        );
      })}
    </div>
  );
}
