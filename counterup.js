document.addEventListener("DOMContentLoaded", function () {

  if (typeof CountUp === "undefined" || typeof ScrollTrigger === "undefined" || typeof gsap === "undefined") {
    console.warn("Required libraries not loaded");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const counters = document.querySelectorAll(".counterup");

  counters.forEach((el, index) => {

    const thisId = "countup" + index;
    el.id = thisId;

    const startNumber = Number(el.textContent.trim());
    const endNumber = Number(el.getAttribute("final-number"));
    const duration = Number(el.getAttribute("count-duration")) || 2;
    const decimals = 0;

    const counter = new CountUp(thisId, startNumber, endNumber, decimals, duration);

    if (!counter.error) {

      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true, // 🔥 ключевая строка
        onEnter: () => counter.start()
      });

    } else {
      console.error(counter.error);
    }

  });

});
