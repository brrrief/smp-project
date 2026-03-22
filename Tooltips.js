  function loadTippy(callback) {
    const popper = document.createElement('script');
    popper.src = 'https://unpkg.com/@popperjs/core@2';
    popper.onload = function() {
      const tippyScript = document.createElement('script');
      tippyScript.src = 'https://unpkg.com/tippy.js@6';
      tippyScript.onload = callback;
      document.head.appendChild(tippyScript);
    };
    document.head.appendChild(popper);
  }

  function initializeTooltips() {
    const elements = document.querySelectorAll('[ms-code-tooltip-right]');
    elements.forEach(element => {
      tippy(element, {
        content: `<div class="tooltip-text">${element.getAttribute('ms-code-tooltip-right')}</div>`,
        placement: 'right',
        followCursor: element.hasAttribute('ms-code-tooltip-followCursor')
          ? element.getAttribute('ms-code-tooltip-followCursor')
          : false,
        theme: 'white-custom',
        arrow: false,
        allowHTML: true
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
      loadTippy(initializeTooltips);
    }, 3500); /
  });
