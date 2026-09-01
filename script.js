const ids = ['home', 'profile', 'expertise', 'experience', 'credentials', 'contact'];
let activeIndex = 0;

function setActive(index) {
  activeIndex = index;
  document.querySelectorAll('.site-header nav button, .floating-index button').forEach((button) => {
    button.classList.toggle('active', button.dataset.target === ids[index]);
  });
}

function horizontalJump(id) {
  const index = ids.indexOf(id);
  const section = document.getElementById(id);
  if (!section) return;
  const direction = index >= activeIndex ? 'right' : 'left';
  section.scrollIntoView({ behavior: 'auto', block: 'start' });
  section.classList.remove('slide-left', 'slide-right');
  void section.offsetWidth;
  section.classList.add(direction === 'right' ? 'slide-right' : 'slide-left');
  setActive(index);
  document.querySelector('.site-header nav').classList.remove('open');
}

document.querySelectorAll('.site-header [data-target]').forEach((button) => button.addEventListener('click', () => horizontalJump(button.dataset.target)));
document.querySelectorAll('.floating-index [data-target]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })));
document.querySelector('.menu').addEventListener('click', () => document.querySelector('.site-header nav').classList.toggle('open'));
document.querySelector('form').addEventListener('submit', (event) => { event.preventDefault(); document.querySelector('.form-notice').hidden = false; });

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActive(ids.indexOf(visible.target.id));
}, { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] });
ids.forEach((id) => observer.observe(document.getElementById(id)));
setActive(0);
