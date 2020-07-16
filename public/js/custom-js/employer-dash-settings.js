/* eslint-disable no-undef */
const submitFunction = async (self, user, type) => {
  const { userId, token } = JSON.parse(user);
  const alertBox = self.querySelector('.alert');
  try {
    const response = await axios.post(`/v1/employer/support`, {
      name: self.name.value,
      email: self.email.value,
      subject: self.subject.value,
      message: self.message.value,
      type,
      user_id: userId,
    }, {
      headers: {
        'CSRF-Token': _csrfToken,
        Authorization: `Bearer ${token}`,
      },
    });
    alertBox.innerHTML = response.data.message || response.data;
    alertBox.classList.add('alert-success');
    alertBox.classList.remove('alert-danger');
    alertBox.style.display = 'block';
    self.classList.remove('was-validated');
    self.reset();
  } catch (err) {
    let errorMessage = 'Something went wrong';
    if (err.response && err.response.data) {
      errorMessage = err.response.data.message || err.response.data.error;
    }
    alertBox.innerHTML = errorMessage;
    alertBox.classList.add('alert-danger');
    alertBox.classList.remove('alert-success');
    alertBox.style.display = 'block';
  }
};
window.addEventListener('load', () => {
  const user = localStorage.getItem('tpAuth');
  const contactUsForm = document.getElementById('contactUs');
  const reportAbuseForm = document.getElementById('reportAbuse');
  [contactUsForm, reportAbuseForm].forEach((form) => {
    // eslint-disable-next-line func-names
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (user && form.checkValidity() !== false) {
        submitFunction(this, user, this.type.value);
      }
    }, false);
  });
}, false)
