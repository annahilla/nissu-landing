import { useState } from "react";

export default function AccordionIsland({ items } : {items: ContentItems[]}) {
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
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="border border-2 border-brown rounded-[1vw] overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 text-left text-xl font-semibold"
              onClick={() => toggle(index)}
            >
                <span>{item.title}</span>
              <img
                className="chevron-icon transition-transform duration-200"
                src={isOpen ? "/images/chevron-up.svg" : "/images/chevron-down.svg"}
                alt="Chevron icon"
              />
            </button>
            <div className={`transition-all duration-300 px-4 pb-4 ${isOpen ? "block" : "hidden"}`}>
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
