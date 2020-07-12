//starter JavaScript for disabling form submissions if there are invalid fields
(function () {
	'use strict';

	window.addEventListener(
		'load',
		function () {
			// Fetch all the forms we want to apply custom Bootstrap validation styles to
			var forms = document.getElementsByClassName('needs-validation');

			// Loop over them and prevent submission
			Array.prototype.filter.call(forms, function (form) {
				form.addEventListener(
					'submit',
					function (event) {
						if (form.checkValidity() === false) {
							event.preventDefault();
							event.stopPropagation();
						}
						form.classList.add('was-validated');
					},
					false
				);
			});
		},
		false
	);


})();
      // <div class="container">
      // <div class="g-signin2" id='employer' data-user="ROL-EMPLOYER" data-onsuccess="onSignIn"></div>
      // <button> </button>
			// <div class="g-signin2" id='employee' data-user="ROL-EMPLOYEE" data-onsuccess="onSignIn"></div>
			
	// async function onSignIn(googleUser) {
	// 	var profile = googleUser.getBasicProfile();
	// 	const role_id = document.querySelector('#googleBtn').dataset.user;
	// 	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	// 	console.log('Name: ' + profile.getName());
	// 	console.log('givenName: ' + profile.getGivenName());
	// 	console.log('familyName: ' + profile.getFamilyName());
	// 	console.log('Image URL: ' + profile.getImageUrl());
	// 	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	// 	// var token = JSON.parse(atob(googleUser.getAuthResponse().id_token.split('.')[1]));
	// 	var token = googleUser.getAuthResponse().id_token
	// 	console.log(token)
	// 	var auth2 = gapi.auth2.getAuthInstance();
	// 	auth2.disconnect();
	// 	const userData = {
	// 		role_id,
	// 		token: token
	// 	}
	// 	console.log(userData);
	// 	axios.post('https://api.lancers.app/v1/auth/google', userData)
	// 		.then(data => {
	// 			console.log(data); // JSON data parsed by `data.json()` call
	// 		}).catch(function (error) {
	// 			console.log(error);
	// 		}).then(function () {
	// 			return window.location.href = 'employer-profile-creation1.html';
	// 		});
	// }