export function initAccordion(containerId = "accordion") {
    const accordion = document.getElementById(containerId);
    if (!accordion) return;
  
    accordion.querySelectorAll("button").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        accordion.querySelectorAll("button").forEach((otherBtn, i) => {
          const content = otherBtn.nextElementSibling;
          if (!content) return;
  
          const icon = otherBtn.querySelector(".chevron-icon");
          if (!icon || !(icon instanceof HTMLImageElement)) return;
  
          if (i === index) {
            const isOpen = !content.classList.contains("hidden");
  
            if (!isOpen) {
              content.classList.toggle("hidden", isOpen);
              icon.src = isOpen ? "/images/chevron-down.svg" : "/images/chevron-up.svg";
            }
  
          } else {
            content.classList.add("hidden");
            icon.src = "/images/chevron-down.svg";
          }
        });
      });
    });
  }
  