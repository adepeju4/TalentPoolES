const token = JSON.parse(localStorage.getItem('tpAuth'));
console.log(token);
// if (!token) {
// 	location.href = '/';
// }
(function () {
	'use strict';
	const response = JSON.parse(atob(token.token.split('.')[1]));
	console.log(response.userTypeId);
	// Redirecting
	if (response.userTypeId == null) {
		// Redirect to employer profile creation page
		window.location.href = '/employer-type';
	} else {
		if (response.verificationStatus == 'Pending') {
			//redirect to the certificate page
			return (window.location.href = '/employer-certificate');
		} else if (response.verificationStatus == 'Disapproved') {
			return (window.location.href = '/upload-doc-failure');
			// Redirect to disapproved page
		} else if (response.verificationStatus == 'Uploaded') {
			// Redirect to successfully uploaded page
			return (window.location.href = '/upload-doc-success');
			// Redirect to disapproved page
		}
	}
})();
