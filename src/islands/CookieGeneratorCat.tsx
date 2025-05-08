import { useState } from "react";
import type { Cookie } from "../types";

export default function CookieGeneratorCat() {
  const [cookies, setCookies] = useState<Cookie[]>([]);

  const generateCookie = () => {
    const id = Date.now();
    const top = Math.random() * (window.innerHeight - 100);
    const left = Math.random() * (window.innerWidth - 100);

    const newCookie: Cookie = { id, top, left };
    setCookies((prev) => [...prev, newCookie]);

    const sound = new Audio("/sounds/meow.mp3");
    sound.play();
  };

  const deleteCookie = (id: number) => {
    setCookies((prev) => prev.filter((cookie) => cookie.id !== id));
    const sound = new Audio("/sounds/bite.mp3");
    sound.play();
  };

  return (
    <div>
      <button className="w-30 h-30 fixed flex gap-4 h-36 items-center bottom-4 left-4 cursor-pointer md:left-8 md:w-auto h-auto">
        <img onClick={generateCookie} src="/images/cat.svg" alt="cat" />
      </button>

      {cookies.map((cookie) => (
        <img
          onClick={() => deleteCookie(cookie.id)}
          key={cookie.id}
          src="/images/cookie.svg"
          alt="Cookie icon"
          className="absolute w-20 h-20 animate-pop"
          style={{ top: cookie.top, left: cookie.left }}
        />
      ))}
    </div>
  );
}
