/* ─── site.js ───
   Page transitions, include at the bottom of every page.
*/

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-loaded');

  // Fade out on navigation, then follow the link
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    if (link.getAttribute('target') === '_blank') return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.add('page-leaving');
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
});

// Handle back/forward button — page might load from cache with opacity: 0
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    document.body.classList.remove('page-leaving');
    document.body.classList.add('page-loaded');
  }
});