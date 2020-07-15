/* eslint-disable no-undef */
$(document).ready(() => {
  $('#show_hide_password a').on('click', (event) => {
    event.preventDefault();
    if ($('#show_hide_password input').attr('type') === 'text') {
      $('#show_hide_password input').attr('type', 'password');
      $('#show_hide_password i').addClass('fa-eye-slash');
      $('#show_hide_password i').removeClass('fa-eye');
    } else if ($('#show_hide_password input').attr('type') === 'password') {
      $('#show_hide_password input').attr('type', 'text');
      $('#show_hide_password i').removeClass('fa-eye-slash');
      $('#show_hide_password i').addClass('fa-eye');
    }
  });

  $('#new_password a').on('click', (event) => {
    event.preventDefault();
    if ($('#new_password input').attr('type') === 'text') {
      $('#new_password input').attr('type', 'password');
      $('#new_password i').addClass('fa-eye-slash');
      $('#new_password i').removeClass('fa-eye');
    } else if ($('#new_password input').attr('type') === 'password') {
      $('#new_password input').attr('type', 'text');
      $('#new_password i').removeClass('fa-eye-slash');
      $('#new_password i').addClass('fa-eye');
    }
  });

  $('#confirm_new_password a').on('click', (event) => {
    event.preventDefault();
    if ($('#confirm_new_password input').attr('type') === 'text') {
      $('#confirm_new_password input').attr('type', 'password');
      $('#confirm_new_password i').addClass('fa-eye-slash');
      $('#confirm_new_password i').removeClass('fa-eye');
    } else if ($('#confirm_new_password input').attr('type') === 'password') {
      $('#confirm_new_password input').attr('type', 'text');
      $('#confirm_new_password i').removeClass('fa-eye-slash');
      $('#confirm_new_password i').addClass('fa-eye');
    }
  });
});

window.addEventListener('load', () => {
  const form = document.getElementById('changePassword');
  // eslint-disable-next-line func-names
  form.addEventListener('input', function (event) {
    if (this.newPassword.value !== this.confirmPassword.value) {
      this.newPassword.setCustomValidity('Password does not match');
      this.confirmPassword.setCustomValidity('Password does not match');
      form.querySelector('#confirm_new_password .invalid-feedback').innerHTML = 'Password does not match';
      form.querySelector('#new_password .invalid-feedback').innerHTML = 'Password does not match';
    } else {
      form.querySelector('#confirm_new_password .invalid-feedback').innerHTML = 'Confirm new password';
      form.querySelector('#new_password .invalid-feedback').innerHTML = 'Enter new password';
      this.newPassword.setCustomValidity('');
      this.confirmPassword.setCustomValidity('');
    }
  });
  // eslint-disable-next-line func-names
  form.addEventListener('submit', function (event) {
    // console.log('this', this.oldPassword);
    if (form.checkValidity() === false || this.newPassword.value !== this.confirmPassword.value) {
      event.stopPropagation();
      event.preventDefault();
    }
    form.classList.add('was-validated');
  }, false);
}, false);
