let originalURL = window.location.href;

// Открытие модалки
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

// Закрытие по кнопке
$(document).on('click', '.modal-close', function() {
  closeModal();
});

function closeModal() {
  $('#project-pop').fadeOut(200);
  $('#ajaxContainer').html('');

  history.pushState({}, '', originalURL);

  if (typeof lenis !== "undefined") {
    lenis.start();
  }
}

// AJAX загрузка контента
function loadDoc(postURL) {
  $('#ajaxContainer').html('');

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      document.getElementById("ajaxContainer").innerHTML = this.responseText;

      setTimeout(function() {
        const modal = document.querySelector('.modal-on');
        if (modal) {
          modal.scrollTop = 0;
        }
      }, 100);

    }
  };
  xhttp.open("GET", postURL, true);
  xhttp.send();
}

// Глобальный скролл модалки (работает независимо от позиции мышки)
document.addEventListener('wheel', function(e) {
  const modal = document.querySelector('.modal-on');
  const popup = document.getElementById('project-pop');

  if (!modal || !popup) return;

  const isVisible = popup.offsetParent !== null;
  if (!isVisible) return;

  e.preventDefault(); // блокируем скролл страницы
  modal.scrollTop += e.deltaY; // прокручиваем модалку
}, { passive: false });

// Обработка кнопки "назад"
window.addEventListener('popstate', function(event) {
  if (!event.state || !event.state.modal) {
    $('#project-pop').fadeOut(200);
    $('#ajaxContainer').html('');

    if (typeof lenis !== "undefined") {
      lenis.start();
    }
  }
});
