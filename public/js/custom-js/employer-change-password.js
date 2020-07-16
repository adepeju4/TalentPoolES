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
  const user = localStorage.getItem('tpAuth');

  form.addEventListener(
    'submit',
    // eslint-disable-next-line func-names
    async function (event) {
      document.getElementById('error-message').style.display = 'none';
      event.stopPropagation();
      event.preventDefault();
      if (form.checkValidity() !== false) {
        if (user) {
          const { userId, token } = JSON.parse(user);
          try {
            const response = await axios.put(`/v1/auth/update-password/${userId}`, {
              oldPassword: this.oldPassword.value,
              newPassword: this.newPassword.value,
            }, {
              headers: {
                'CSRF-Token': _csrfToken,
                Authorization: `Bearer ${token}`,
              },
            });
            // eslint-disable-next-line no-alert
            document.getElementById('error-message').innerHTML = response.data.data.message;
            document.getElementById('error-message').classList.add('alert-success');
            document.getElementById('error-message').classList.remove('alert-danger');
            document.getElementById('error-message').style.display = 'block';
            this.classList.remove('was-validated');
            this.reset();
            return;
          } catch (err) {
            // console.log(err);
            // eslint-disable-next-line no-alert
            let errorMessage = 'Something went wrong';
            if (err.response && err.response.data) {
              errorMessage = err.response.data.message || err.response.data.error;
            }
            document.getElementById('error-message').innerHTML = errorMessage;
            document.getElementById('error-message').classList.remove('alert-success');
            document.getElementById('error-message').classList.add('alert-danger');
            document.getElementById('error-message').style.display = 'block';
            // alert(err.response ? err.response.data && err.response.data.message || 'something went wrong' : 'Something went wrong');
          }
        }
      }

      form.classList.add('was-validated');
    },
    false,
  );
}, false);
