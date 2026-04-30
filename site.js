/* ─── shared.js ───
   Custom cursor, page transitions, scroll fade-ins.
   Include at the bottom of every page.
*/

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Custom Cursor ─── */
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    // The dot follows instantly
    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
  });

  // The outer ring follows with a soft lag
  function animateCursor() {
    dotX += (cursorX - dotX) * 0.15;
    dotY += (cursorY - dotY) * 0.15;
    cursor.style.left = dotX + 'px';
    cursor.style.top = dotY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Grow cursor on hover over interactive elements
  document.querySelectorAll('a, button, .card, input, textarea, video').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });

  // Hide custom cursor on touch devices
  window.addEventListener('touchstart', () => {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
  }, { once: true });


  /* ─── Page Transition ─── */
  // Fade in on load
  document.body.classList.add('page-loaded');

  // Fade out on navigation
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only intercept local page links
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.add('page-leaving');
      setTimeout(() => {
        window.location.href = href;
      }, 350);
    });
  });

});