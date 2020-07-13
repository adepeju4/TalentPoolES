const forgotPasswordForm = document.querySelector('#forgot-password');

// Function to show alert message
function showMessage(message, alertType) {
  const alert = document.createElement('div');
  alert.id = 'parentdiv';

  alert.innerHTML = `
 <div class="alert ${alertType}" role="alert" id="error">
   ${message}
 </div>
 `;
  forgotPasswordForm.insertBefore(alert, forgotPasswordForm.firstElementChild);
  setTimeout(removeMessage, 5000);
}

// Function to remove alert message
function removeMessage() {
  let message = document.getElementById('parentdiv');
  message.remove();
}

// Function to handle response from API
function responseHandler(res) {
  if (res.data.status === 'success') {
    showMessage(`Success, ${res.data.data.message}...`, 'alert-success');
  }
}
function errorHandler(err) {
  showMessage('Error, User not found!', 'alert-danger');
}

forgotPasswordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  forgotPasswordForm.value = '';
  const email = forgotPasswordForm.querySelector('input').value;

  axios
    .post('https://api.lancers.app/v1/auth/forgot-password', {
      email: email,
    })
    .then((res) => responseHandler(res))
    .catch((err) => errorHandler(err));
  document.getElementById('forgot-password').reset();
});
