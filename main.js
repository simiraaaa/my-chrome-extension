riot.mount('app');
window.addEventListener('keydown', (e) => {
  if (e.metaKey && e.key === 'p') {
    e.preventDefault();
    close();
  }
});
