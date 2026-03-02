let originalURL = window.location.href;

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

  history.pushState({}, '', originalURL);

  if (typeof lenis !== "undefined") {
    lenis.start();
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

        const modal = document.querySelector('.modal-on');
        modal.scrollTop = 0;

        modal.addEventListener('wheel', function(e) {
          e.stopPropagation();
        }, { passive: false });

      }, 100);

    }
  };
  xhttp.open("GET", postURL, true);
  xhttp.send();
}

window.addEventListener('popstate', function(event) {
  if (!event.state || !event.state.modal) {
    $('#project-pop').fadeOut(200);
    $('#ajaxContainer').html('');

    if (typeof lenis !== "undefined") {
      lenis.start();
    }
  }
});
