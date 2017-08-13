const emailButton = new Clipboard('#email');
const tooltip = document.querySelector('.tooltip');

emailButton.on('success', (evt) => {
  tooltip.classList.remove('hidden');
  setTimeout(() => {
    tooltip.classList.add('hidden');
  }, 1500);
});

emailButton.on('error', (e) => {
  console.error('whoops');
});
