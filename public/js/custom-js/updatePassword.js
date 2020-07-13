function handleSubmit(e) {
  e.preventDefault();
  console.log('Submit is working');
  document.getElementById('error').style.display = 'none';
  document.getElementById('error-currentPassword').style.display = 'none';

  let newPassword = document.getElementById('new-password').value;
  let confirmPassword = document.getElementById('confirm_password').value;
  if (newPassword === confirmPassword) {
    let tpAuth = JSON.parse(localStorage.getItem('tpAuth'));

    // Get the token from tpAuth Object when it has been stored in LC
    let token = tpAuth.token;
    if (!token) {
      console.log('There is no token stored in local storage(the tPAuth)');
    }
    // Test token
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5b2JhbWlhbGFkZW5veWVAeWFob28uY29tIiwidXNlcklkIjoiMTljNzNmNDYtMWRhNy00NDVhLWFhZmEtODExYTc3ZTRmNWQwIiwidXNlclJvbGUiOiJST0wtRU1QTE9ZRUUiLCJ1c2VyVHlwZUlkIjoiN2EyZWQ4MTQtZDc4Mi00ODZlLTlmYzQtMTk3ZTA2ZDBhZTg4IiwiaWF0IjoxNTk0MzE1OTY0LCJleHAiOjE1OTQ0MDIzNjR9.mb7fJAANyjv5lEf5i5AwN2butPf4ODKL-i9hLRXmX74";

    // Get the user ID from tpAuth object when it has been stored in LS
    let userId = tpAuth.userId;
    if (!userId) {
      console.log('There is no user ID in Local storage in tpAuth');
    }
    // Test User ID
    // let userId = "19c73f46-1da7-445a-aafa-811a77e4f5d0";
    let oldPassword = document.getElementById('current-password').value;
    let newPassword = document.getElementById('new-password').value;
    let url = `/v1/auth/update-password/${userId}`;

    axios
      .put(
        url,
        { oldPassword: oldPassword, newPassword: newPassword },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        document.getElementById('error-currentPassword').style.display =
          'block';
        //  alert("Current Password is not correct")
      });
  } else {
    document.getElementById('error').style.display = 'block';
    // alert("Passwords do not match");
  }
}
