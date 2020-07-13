const resetPassword = document.querySelector('#reset-password');
resetPassword.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.getElementById('error').style.display = 'none';
  document.getElementById('error-currentPassword').style.display = 'none';
  // get query string from url
  queryStr = window.location.search;
  let resetToken = queryStr.slice(1);
  let newPassword = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirmPassword').value; // Compare passwords
  if (newPassword === confirmPassword) {
    const url = `https://api.lancers.app/v1/auth/reset-password/${resetToken}`;
    try {
      const res = await axios.put(
        url,
        { password: newPassword },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      if (res.data.status === 'success') {
        console.log('changed');
        window.location = 'password-success';
      } else {
        console.log(res.data);
      }
    } catch (error) {
      document.getElementById('error-currentPassword').style.display = 'block';
    }
  } else {
    document.getElementById('error').style.display = 'block';
  }
});
