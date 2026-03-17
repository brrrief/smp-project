window.addEventListener('DOMContentLoaded', () => {

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@%&?/";
const duration = 1300; // 

const elements = document.querySelectorAll('.tag-text');

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        const el = entry.target;

        if (entry.isIntersecting) {

            resetElement(el);

            setTimeout(() => {
                animate(el);
            }, 250);

        } else {

            resetElement(el);

        }

    });

}, { threshold: 0.2 });


elements.forEach(el => {

    el.dataset.original = el.textContent;

    observer.observe(el);

});


function resetElement(el){

    cancelAnimationFrame(el.raf);

    const text = el.dataset.original;

    let scrambled = '';

    for(let i = 0; i < text.length; i++){

        scrambled += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];

    }

    el.textContent = scrambled;

    el.style.filter = "blur(6px)";
    el.style.opacity = "1";

}


function easeOutCubic(t){
    return 1 - Math.pow(1 - t, 3);
}


function animate(el){

    const original = el.dataset.original;
    const length = original.length;

    const start = performance.now();

    const randomCache = new Array(length).fill('');

    function frame(now){

        const elapsed = now - start;

        let progress = Math.min(elapsed / duration, 1);

        progress = easeOutCubic(progress);

        const reveal = Math.floor(progress * length);

        let output = '';

        for(let i = 0; i < length; i++){

            if(i < reveal){

                output += original[i];

            } else {

                if(Math.random() < 0.18){ 

                    randomCache[i] = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];

                }

                output += randomCache[i] || scrambleChars[Math.floor(Math.random() * scrambleChars.length)];

            }

        }

        el.textContent = output;

        const blur = 6 * (1 - progress);

        el.style.filter = `blur(${blur}px)`;

        if(progress < 1){

            el.raf = requestAnimationFrame(frame);

        } else {

            el.textContent = original;

            el.style.filter = "none";

        }

    }

    el.raf = requestAnimationFrame(frame);

}

});
