//starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'
  
  window.addEventListener('load', function () {
    var forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  }, false)
}())
const submitButton = document.getElementById('signup-btn')

let github = document.getElementById('githubBtn')
github.addEventListener('click', () => {
const requestOptions = {
  method: "GET",
  headers: {
    'Accept': 'application/json, text/plain',
    'Content-type': 'application/json',
  }
}
const url = 'https://api.lancers.app/v1/auth/github'
try {
  const githbauth = fetch(url , requestOptions);
} catch (err) {
  
  showAlert(err)
}
})
let google = document.getElementById('googleBtn')
google.addEventListener('click', () => {
const requestOptions = {
  method: "GET",
  headers: {
    'Accept': 'application/json, text/plain',
    'Content-type': 'application/json',
  }
}
const url = 'https://api.lancers.app/v1/auth/google'
try {
  const googleauth = fetch(url , requestOptions);
} catch (err) {
  showAlert(err)
}
})

submitButton.addEventListener('click', (e) => {
e.preventDefault()
submitButton.innerHTML = '<span class="spinner-border spinner-border" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>';

checkInputs()

status()
function status(){
let email = document.getElementById('email').value
let password = document.getElementById('password').value

signupEmployee();
    function signupEmployee(){
      axios({
        method: 'POST',
        url: 'https://api.lancers.app/v1/auth/admin-login',
        data: {
          email: email,
          password: password
        }
      })
      .then((res) => {
        submitButton.innerText = 'Login'
        if(res.data.status === 'success') {        
            console.log(res.data);
            console.log(res.data.data.token);
            console.log(res.data.data.user);
            localStorage.setItem('tpAuth', JSON.stringify({
              token: res.data.data.token,
              userId: res.data.data.user
           }));

          return (window.location.href = "/admin-dashboard");

        } else {
          submitButton.innerText = 'Login';
          showAlert(res.error)
        }
      })
      .catch((err) => {
             showAlert(err.message)
            console.log('Error', err.message)
      })
    };
}
})

function checkInputs() {
  let email = document.getElementById('email').value.trim()
  let password = document.getElementById('password').value.trim()
  document.querySelector('.needs-validation').classList.add('was-validated')
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
    if(email === '' ) {
      setErrorE(email, '* Email cannot be blank')
    } else if(!email.match(validEmail)) {
      setRightE(email, '* Please input a valid email')
    } else {
      const small = document.querySelector('#invalidE')
      small.style.display = 'none'    
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=`~{}[\]|'"<>,./?])(?=.{8,})/;
    if(password === '') {
      setErrorPass(password, '* Password cannot be blank')
    } else if(!password.match(regex)) {
      checkPass(password, '* Password must contain a minimum of 8 characters, a capital letter, a number and special character')
    } else {
      const small = document.querySelector('#invalidPass')
      small.style.display = 'none'
    }
}

//Email Error Functions
function setErrorE(input, message){
const small = document.querySelector('#invalidE')
small.innerHTML = message
small.style.display = 'block'
}

function setRightE(input, message){
const small = document.querySelector('#invalidE')
small.innerHTML = message
small.style.display = 'block'
}

//Password Error Functions
function setErrorPass(input, message){
const small = document.querySelector('#invalidPass')
small.innerHTML = message
small.style.display = 'block'
}

function checkPass(input, message){
const small = document.querySelector('#invalidPass')
small.innerHTML = message
small.style.display = 'block'
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
