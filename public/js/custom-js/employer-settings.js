// contact-us
const contactUs = document.querySelector('#contact-us');
contactUs.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#cu-name').value;
  const email = document.querySelector('#cu-email').value;
  const subject = document.querySelector('#cu-subject').value;
  const content = document.querySelector('#cu-textarea').value;
  json = { name: name, email: email, subject: subject, content: content };
  console.log(json);
});

// report abuse
const reportAbuse = document.querySelector('#report-abuse');
reportAbuse.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#ra-name').value;
  const email = document.querySelector('#ra-email').value;
  const subject = document.querySelector('#ra-subject').value;
  const content = document.querySelector('#ra-textarea').value;
  json = { name: name, email: email, subject: subject, content: content };
  console.log(json);
});