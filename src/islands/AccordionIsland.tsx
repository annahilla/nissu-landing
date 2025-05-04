import { useState } from "react";

export default function AccordionIsland({ items } : {items: AccordionItems[]}) {
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
              className="w-full flex justify-between items-center py-4 px-6 text-left text-2xl font-semibold"
              onClick={() => toggle(index)}
            >
              <div className="flex gap-2">
                <img className="m-2" src="/images/paw-print.svg" alt="Paw print icon" />
                <span>{item.title}</span>
              </div>
              <img
                className="chevron-icon ml-4 transition-transform duration-200"
                src={isOpen ? "/images/chevron-up.svg" : "/images/chevron-down.svg"}
                alt="Chevron icon"
              />
            </button>
            <div className={`transition-all duration-300 px-6 pb-4 text-lg ${isOpen ? "block" : "hidden"}`}>
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
