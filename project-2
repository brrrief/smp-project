const duration = 10000;
let timer;
let progressInterval;

function getVisibleProjects() {
  return Array.from(document.querySelectorAll('[data-project]'))
    .filter(el => el.offsetParent !== null);
}

function resetAllAnimations() {

  document.querySelectorAll('.image-project').forEach(cover => {
    cover.style.transition = "none";
    cover.style.clipPath = "inset(0 0 100% 0)";
    cover.style.transform = "scale(1.08)";
    cover.style.opacity = "0";
  });

  document.querySelectorAll('.project-content-tags').forEach(el => {
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(150%)";
  });

  document.querySelectorAll('.project-content-heading').forEach(el => {
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(150%)";
  });

  document.querySelectorAll('.project-content-divider').forEach(el => {
    el.style.transition = "none";
    el.style.width = "0%";
  });
}

function showProject(button) {

  const id = button.getAttribute('data-project');
  const visible = getVisibleProjects();

  clearInterval(progressInterval);
  clearTimeout(timer);

  document.querySelectorAll('[data-project-content]')
    .forEach(el => el.style.display = "none");

  visible.forEach(btn => {
    btn.classList.remove('active');
    const div = btn.querySelector('.project-divider');
    if (div) div.style.width = "0%";
  });

  resetAllAnimations();

  const content = document.querySelector('[data-project-content="' + id + '"]');
  if (!content) return;

  content.style.display = "block";
  button.classList.add('active');

  startProgress(button);

  const cover = content.querySelector('.image-project');
  const tags = content.querySelector('.project-content-tags');
  const divider = content.querySelector('.project-content-divider');
  const heading = content.querySelector('.project-content-heading');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {

      if (cover) {
        cover.style.transition = `
          clip-path 0.9s cubic-bezier(0.77, 0, 0.175, 1),
          transform 1.2s cubic-bezier(0.22, 1, 0.36, 1),
          opacity 0.6s ease
        `;
        cover.style.clipPath = "inset(0 0 0 0)";
        cover.style.transform = "scale(1)";
        cover.style.opacity = "1";
      }

      if (tags) {
        tags.style.transition = `
          transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
          opacity 0.5s ease
        `;
        tags.style.transform = "translateY(0)";
        tags.style.opacity = "1";
      }

      if (divider) {
        setTimeout(() => {
          divider.style.transition = "width 0.8s cubic-bezier(0.77, 0, 0.175, 1)";
          divider.style.width = "100%";
        }, 200);
      }

      if (heading) {
        setTimeout(() => {
          heading.style.transition = `
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.6s ease
          `;
          heading.style.transform = "translateY(0)";
          heading.style.opacity = "1";
        }, 350);
      }

    });
  });
}

function startProgress(button) {

  const divider = button.querySelector('.project-divider');
  if (!divider) return;

  let start = Date.now();

  progressInterval = setInterval(() => {
    let percent = ((Date.now() - start) / duration) * 100;
    divider.style.width = Math.min(percent, 100) + "%";
  }, 16);

  timer = setTimeout(nextProject, duration);
}

function nextProject() {

  const visible = getVisibleProjects();
  const active = document.querySelector('[data-project].active');

  if (!visible.length) return;

  let index = visible.indexOf(active);

  if (index + 1 < visible.length) {
    showProject(visible[index + 1]);
  } else {
    showProject(visible[0]);
  }
}

document.addEventListener('click', function(e) {
  const button = e.target.closest('[data-project]');
  if (!button) return;
  e.preventDefault();
  showProject(button);
});

window.addEventListener("load", function() {
  const visible = getVisibleProjects();
  if (visible.length > 0) {
    showProject(visible[0]);
  }
});
