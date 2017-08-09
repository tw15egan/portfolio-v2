const emailButton = new Clipboard('#email');

emailButton.on('success', (evt) => {
  console.log('success');
});

emailButton.on('error', (e) => {
  console.error('whoops');
});
