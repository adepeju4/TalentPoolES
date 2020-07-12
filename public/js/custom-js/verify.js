

const verifyURL = window.location.search
const verifySuccess = document.getElementById('verify-success')
const verifyFail = document.getElementById('verify-fail')
const resendForm = document.getElementById('resend-form')
const resendLink = document.getElementById('resend-link')
const resendButton = document.getElementById('resend-button')
const resentNotify = document.getElementById('resent-notify')
const existingEmail = document.getElementById('existing-email')
// const invalidEmail = document.getElementById('invalid-email')
// const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/

axios({
  method: 'get',
  url: `https://api.lancers.app/v1/auth/email/verify/${verifyURL}`
})
.then((res) => {
  if(res.data.status === 'success') {
    verifySuccess.style.display = 'block'
    setTimeout(() => {
      redirect()
    }, 5000);
  }
})
.catch((err) => {
  if(err.response.status === 400) {
    verifyFail.style.display = 'block'
  } else if(err.response.status === 401) {
    existingEmail.style.display = 'block'
    setTimeout(() => {
      redirect()
    }, 5000);
  }
})

resendLink.addEventListener('click', () => {
  verifyFail.style.display = 'none'
  resendForm.style.display = 'block'
})

resendButton.addEventListener('click', (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value
  resendButton.innerHTML = '<span class="spinner-border spinner-border" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>'

  // console.log(email)
  axios({
     method: 'put',
     url: 'https://api.lancers.app/v1/auth/email/verify/resend',
     data: {
     email: email
     }
   })
   .then((res) => {
     resendButton.innerText = 'Resend Link'
     if(res.data.status = 'success') {
      resendForm.style.display = 'none'
      resentNotify.style.display = 'block'
      setTimeout(() => {
        redirect()
      }, 5000);
    }
  })
  .catch((err) => {
    resendButton.innerText = 'Resend Link'
    if(err.response.status === 400) {
      showAlert('Please input a valid email!')
     } else if(err.response.status === 403) {
       showAlert('Invalid Email! Email cannot be found')
     } else if(err.response.status === 401) {
       showAlert('Email has been verified. You will be redirected to login')
       setTimeout(() => {
        redirect()
      }, 5000);
     } else {
       showAlert(err.message)
     }
   })
})

//Email Error Functions
 function setErrorE(input, message){
   invalidEmail.innerHTML = message
   invalidEmail.style.display = 'block'
 }

 function setRightE(input, message){
   invalidEmail.innerHTML = message
   invalidEmail.style.display = 'block'
 }


// show alert message on page
function showAlert(message) {
  const alert = document.getElementById('alert');
  const alertMessage = document.getElementById('alertMessage');

  alert.classList.remove('d-none');
  alertMessage.innerText = message;

  setTimeout(() => {
    hideAlert()
  }, 6000);
}
function hideAlert() {
  document.getElementById('alert').classList.add('d-none');
}
function redirect() {
  window.location.replace('/employee-sign-in')
}
