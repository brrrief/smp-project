document.addEventListener("DOMContentLoaded", function () {

  const elements = document.querySelectorAll(".letter-scroll");

  elements.forEach(el => {

    const words = el.textContent.split(" ");
    el.innerHTML = "";

    words.forEach((word, wIndex) => {

      const wordSpan = document.createElement("span");
      wordSpan.classList.add("word");

      word.split("").forEach((char, cIndex) => {
        const charSpan = document.createElement("span");
        charSpan.classList.add("char");
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });

      el.appendChild(wordSpan);

      if (wIndex < words.length - 1) {
        el.appendChild(document.createTextNode(" "));
      }

    });

  });

  function animateLetters() {

    const windowHeight = window.innerHeight;

    document.querySelectorAll(".letter-scroll").forEach(el => {

      const rect = el.getBoundingClientRect();
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.2;

      const progress = (start - rect.top) / (start - end);
      const clamped = Math.min(Math.max(progress, 0), 1);

      const chars = el.querySelectorAll(".char");
      const total = chars.length;

      const revealCount = Math.floor(clamped * total);

      chars.forEach((char, index) => {
        if (index <= revealCount) {
          char.style.color = "#ffffff";
        } else {
          char.style.color = "rgba(255,255,255,0.3)";
        }
      });

    });
  }

  window.addEventListener("scroll", animateLetters);
  animateLetters();

});
