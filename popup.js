
let originalURL = window.location.href;
let modalScrollY = 0;
let modalCurrentY = 0;
let modalAnimating = false;
let modal = null;

const isTouchDevice =
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  window.matchMedia("(pointer:coarse)").matches;


/* OPEN MODAL */

$(document).on('click', '.button', function(e){

  e.preventDefault();

  const postURL = $(this).attr("href");

  history.pushState({ modal:true },'',postURL);

  $('#project-pop').fadeIn(200);

  $('body').addClass('modal-open');

  if(typeof lenis !== "undefined" && !isTouchDevice){
    lenis.stop();
  }

  loadDoc(postURL);

});


/* CLOSE MODAL */

$(document).on('click','.modal-close',function(){
  closeModal();
});


function closeModal(){

  $('#project-pop').fadeOut(200);

  $('#ajaxContainer').html('');

  modalScrollY = 0;
  modalCurrentY = 0;
  modalAnimating = false;
  modal = null;

  $('body').removeClass('modal-open');

  history.pushState({},'',originalURL);

  if(typeof lenis !== "undefined" && !isTouchDevice){
    lenis.start();
  }

}


/* INIT SCROLL */

function initModalSmoothScroll(){

  modal = document.querySelector('.modal-on');

  if(!modal) return;

  modal.scrollTop = 0;

  modalScrollY = 0;
  modalCurrentY = 0;
  modalAnimating = false;


  /* MOBILE → НАТИВНЫЙ SCROLL */

  if(isTouchDevice){

    modal.style.overflowY = "auto";
    modal.style.webkitOverflowScrolling = "touch";
    modal.style.touchAction = "pan-y";

    return;

  }


  /* DESKTOP → SMOOTH SCROLL */

  const modalOverlay = document.getElementById('project-pop');
  const modalCloseBtns = document.querySelectorAll('.modal-close');

  const modalElements = [modal];

  if(modalOverlay) modalElements.push(modalOverlay);

  modalCloseBtns.forEach(el => modalElements.push(el));


  modalElements.forEach(el=>{
    el.removeEventListener('wheel',handleModalWheel);
  });


  modalElements.forEach(el=>{

    if(!el) return;

    el.addEventListener('wheel',handleModalWheel,{ passive:false });

  });

}


/* WHEEL */

function handleModalWheel(e){

  if(!modal) return;

  e.preventDefault();
  e.stopPropagation();

  modalScrollY += e.deltaY;

  const maxScroll = modal.scrollHeight - modal.clientHeight;

  modalScrollY = Math.max(0,Math.min(modalScrollY,maxScroll));

  if(!modalAnimating){

    modalAnimating = true;

    requestAnimationFrame(tick);

  }

}


/* SMOOTH TICK */

function tick(){

  if(!modal) return;

  const ease = 0.08;

  modalCurrentY += (modalScrollY - modalCurrentY) * ease;

  modal.scrollTop = modalCurrentY;

  if(Math.abs(modalScrollY - modalCurrentY) > 0.1){

    requestAnimationFrame(tick);

  }else{

    modalAnimating = false;

  }

}


/* AJAX LOAD */

function loadDoc(postURL){

  $('#ajaxContainer').html('');

  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200){

      const parser = new DOMParser();

      const doc = parser.parseFromString(this.responseText,'text/html');

      const bodyContent = doc.body.innerHTML;

      document.getElementById("ajaxContainer").innerHTML = bodyContent;

      setTimeout(function(){

        initModalSmoothScroll();

      },100);

    }

  };

  xhttp.open("GET",postURL,true);

  xhttp.send();

}


/* BACK BUTTON */

window.addEventListener('popstate',function(event){

  if(!event.state || !event.state.modal){

    closeModal();

  }

});
