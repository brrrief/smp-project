let originalURL = window.location.href;
let modalScrollY = 0;
let modalCurrentY = 0;
let modalAnimating = false;
let modal = null;

$(document).on('click', '.button', function(e) {
  e.preventDefault();

  var postURL = $(this).attr("href");

  history.pushState({ modal: true }, '', postURL);

  $('#project-pop').fadeIn(200);

  if (typeof lenis !== "undefined") {
    lenis.stop();
  }

  loadDoc(postURL);
});

$(document).on('click', '.modal-close', function() {
  closeModal();
});

function closeModal() {
  $('#project-pop').fadeOut(200);
  $('#ajaxContainer').html('');

  modalScrollY = 0;
  modalCurrentY = 0;
  modalAnimating = false;
  modal = null;

  history.pushState({}, '', originalURL);

  if (typeof lenis !== "undefined") {
    lenis.start();
  }
}

function initModalSmoothScroll() {
  modal = document.querySelector('.modal-on');
  if (!modal) return;

  modal.scrollTop = 0;
  modalScrollY = 0;
  modalCurrentY = 0;
  modalAnimating = false;

  const modalOverlay = document.getElementById('project-pop');
  const modalCloseBtns = document.querySelectorAll('.modal-close');

  const modalElements = [modal];
  if (modalOverlay) modalElements.push(modalOverlay);
  modalCloseBtns.forEach(el => modalElements.push(el));

  modalElements.forEach(el => {
    el.removeEventListener('wheel', handleModalWheel);
  });

  modalElements.forEach(el => {
    if (!el) return;
    el.addEventListener('wheel', handleModalWheel, { passive: false });
  });
}

function handleModalWheel(e) {
  if (!modal) return;
  
  e.preventDefault();
  e.stopPropagation();

  modalScrollY += e.deltaY;

  if (!modalAnimating) {
    modalAnimating = true;
    requestAnimationFrame(tick);
  }
}

function tick() {
  if (!modal) return;
  
  const ease = 0.07; // (0.08-0.15)
  modalCurrentY += (modalScrollY - modalCurrentY) * ease;
  modal.scrollTop = modalCurrentY;

  if (Math.abs(modalScrollY - modalCurrentY) > 0.1) {
    requestAnimationFrame(tick);
  } else {
    modalAnimating = false;
  }
}

function loadDoc(postURL) {
  $('#ajaxContainer').html('');

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      document.getElementById("ajaxContainer").innerHTML =
        this.responseText;

      setTimeout(function() {
        initModalSmoothScroll();
      }, 100);
    }
  };
  xhttp.open("GET", postURL, true);
  xhttp.send();
}

window.addEventListener('popstate', function(event) {
  if (!event.state || !event.state.modal) {
    closeModal();
  }
});
