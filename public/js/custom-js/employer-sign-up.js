const individualForm = document.getElementById("individualForm"),
  firstName = document.getElementById("firstName"),
  lastName = document.getElementById("lastName"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  confirmPassword = document.getElementById("confirmPassword"),
  phoneNo = document.getElementById("phoneNo"),
  submitBtn = document.getElementById("submitBtn");

const orgForm = document.getElementById("orgForm"),
  orgName = document.getElementById("orgName"),
  orgEmail = document.getElementById("orgEmail"),
  orgPassword = document.getElementById("orgPassword"),
  confirmOrgPassword = document.getElementById("confirmOrgPassword"),
  orgSubmitBtn = document.getElementById("orgSubmitBtn"),
  // employerType = document.getElementById("employerType"),
  alert = document.getElementById("alert"),
  alertMessage = document.getElementById("alertMessage");

//Define github and google variable for individual and organization


// object for storing validation status (variable)
let validated = {};

// show alert
function showAlert(message) {
  alertMessage.innerText = message;
  alert.classList.remove("d-none");
  setTimeout(() => {
    alert.classList.add("d-none");
  }, 6000);
}

// Show input error message
function showError(input, message) {
  const parent = input.parentElement;
  input.classList.add("is-invalid");
  let error = parent.querySelector("div");
  error.className = "invalid-feedback";
  error.innerText = input.value !== "" ? message : "";
  validated[input.id] = false;
}

// clear error message
function clearError(input) {
  const parent = input.parentElement;
  input.classList.remove("is-invalid");
  input.classList.remove("is-valid");
  const error = parent.querySelector("div");
  error.innerText = "";
}

function showRequired(input, message) {
  const parent = input.parentElement;
  const error = parent.querySelector("div");
  input.classList.add("is-invalid");
  error.className = "invalid-feedback";
  error.innerText = message;
  validated[input.id] = false;
}

// Show success outline
function showSuccess(input) {
  const parent = input.parentElement;
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  validated[input.id] = true;
}

// email validation
function checkEmail(input) {
  clearError(input);
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else if (input.value.length > 0) {
    showError(input, "Email is not valid.");
  }
}

// check names
function checkName(input) {
  const re = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

  if (re.test(input.value)) {
    checkLength(input, 2);
  } else if (input.value !== "") {
    showError(input, "Please enter a valid name");
  } else {
    clearError(input);
  }
}

// check phone number
function checkPhone(input) {
  const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
  // const length = String(Number(input.value)).length;
  const length = input.value.length;
  if (length > 10 && length < 16) {
    if (!regex.test(input.value.trim())) {
      showError(input, "Please enter a valid phone number");
      // showError(input, "Phone number must begin with 0");
    } else {
      showSuccess(input);
    }
  } else if (/\D/.test(input.value.trim())) {
    showError(input, "Phone number must only contain digits");
  } else {
    showError(input, "Phone number must be 11 to 15 digits");
  }
}

// Check Required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showRequired(input, `${getFieldName(input)} is required`);
    }
  });
}

// check input length
function checkLength(input, min, max = 30) {
  if (input.value.length < 1) {
    return;
  }
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must have at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must have less than ${max + 1} characters`
    );
  } else {
    showSuccess(input);
  }
}

// get field names
function getFieldName(input) {
  const fieldName = input.id.charAt(0).toUpperCase().concat(input.id.slice(1));
  switch (fieldName) {
    case "LastName":
      return "Last Name";
    case "FirstName":
      return "First Name";
    case "ConfirmPassword":
      return "Password Confirmation";
    case "PhoneNo":
      return "Phone Number";
    case "OrgName":
      return "Organization Name";
    case "OrgEmail":
      return "Organization Email";
    case "OrgPassword":
      return "Password";
    case "ConfirmOrgPassword":
      return "Password Confirmation";
    default:
      return fieldName;
  }
}

// check password
function checkPassword(input) {
  clearError(input);
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(){}[\]\|;:'"<>,.?/])(?=.{8,})/;

  // let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([!@#$%^&*()_+=`~{}[\]-|'"<>,./?]*)(?=.{8,})/;

  if (input.value.length > 7) {
    if (!regex.test(input.value)) {
      showError(
        input,
        "Weak Password: password must include a capital letter, a symbol and a number"
      );
    } else if (regex.test(input.value)) {
      showSuccess(input);
    }
  } else {
    showError(
      input,
      "Password must be at least 8 characters long and include  a number, upper and lowercase letters"
    );
  }
}

// check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value && input2.value) {
    if (input1.value !== input2.value) {
      showError(input2, "Passwords do not match");
    } else {
      showSuccess(input2);
    }
  }
}

// event listeners
firstName.addEventListener("input", () => {
  clearError(firstName);

  setTimeout(() => {
    checkName(firstName);
  }, 1000);
});

lastName.addEventListener("input", () => {
  clearError(lastName);

  setTimeout(() => {
    checkName(lastName);
  }, 1000);
});

email.addEventListener("input", () => {
  clearError(email);
  if (email.value !== "") {
    setTimeout(() => {
      checkEmail(email);
    }, 1000);
  } else {
    clearError(email);
  }
});

phoneNo.addEventListener("input", () => {
  clearError(phoneNo);
  setTimeout(() => {
    if (phoneNo.value !== "") {
      checkPhone(phoneNo);
    } else {
      clearError(phoneNo);
    }
  }, 1000);
});

password.addEventListener("input", () => {
  clearError(password);
  if (password.value !== "") {
    setTimeout(() => {
      checkPassword(password);
      checkPasswordsMatch(password, confirmPassword);
    }, 1000);
  } else {
    clearError(password);
  }
});

confirmPassword.addEventListener("input", () => {
  clearError(confirmPassword);
  if (confirmPassword.value !== "") {
    setTimeout(() => {
      checkPasswordsMatch(password, confirmPassword);
    }, 1000);
  } else {
    clearError(confirmPassword);
  }
});

confirmPassword.addEventListener("blur", () => {
  clearError(confirmPassword);
  if (confirmPassword.value !== "") {
    checkPasswordsMatch(password, confirmPassword);
  } else {
    clearError(confirmPassword);
  }
});



// form submissions

individualForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validated = {};
  alert.classList.add("d-none");
  alertMessage.innerText = "";

  checkName(firstName);
  checkName(lastName);
  checkEmail(email);
  checkPhone(phoneNo);
  checkPassword(password);
  checkPasswordsMatch(password, confirmPassword);
  checkRequired([
    firstName,
    lastName,
    email,
    phoneNo,
    password,
    confirmPassword,
  ]);

  if (!Object.values(validated).includes(false)) {
    // clear object in localStorage then save unsent data to localStorage
    localStorage.setItem("talentPool", "");
    localStorage.setItem(
      "talentPool",
      JSON.stringify({
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        phoneNo: phoneNo.value.trim(),
      })
    );

    const formData = {
      email: email.value.trim(),
      password: password.value,
    };

    const signupEmployer = () => {
      let email = document.getElementById("email").value
      let password = document.getElementById("password").value
      axios({
        method: 'POST',
        url: 'https://api.lancers.app/v1/auth/employer-signup',
        data: {
          email: email,
          password: password
        }
      })
      .then((res) => {
        document.getElementById("submitBtn").innerText = 'Sign Up'
        let ok = 'success'
        if(res.data.status === ok) {
          $('#exampleModal').modal();
        } else {
          document.getElementById("submitBtn").innerText = 'Sign Up';
          showAlert(res.error)
        }
      })
      .catch((err) => {
          if(err.response.status === 403) {
            // console.log('responded with error', err.response.status)
            document.getElementById("submitBtn").innerText = 'Sign Up'
            showAlert('Email already exist!')
          } else if(err.response.status === 400) {
            if(email === '') {
              document.getElementById("submitBtn").innerText = 'Sign Up'
              showAlert('Email cannot be empty')
            } else {
            document.getElementById("submitBtn").innerText = 'Sign Up'
            // showAlert('Cannot have duplicate unique fields!')
            }
          } else if(err.response.status === 500) {
            document.getElementById("submitBtn").innerText = 'Sign Up'
            showAlert('Oops! Something went wrong. Please try again.')
          } else if(err.request) {
            // console.log('issue with request')
          } else {
            showAlert(err.message)
            console.log('Error', err.message)
          }
      })
    };

    // check for agreement to terms
    // add button loader
    if (document.getElementById("termsPolicy").checked) {
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>';
      setTimeout(() => {
        if (alertMessage.innerText === "") {
          // showAlert(
          //   "Sign Up failed, please check your internet and try again."
          // );
        }
        submitBtn.innerText = "Sign Up";
        submitBtn.disabled = false;
      }, 20000);

      // submit form
      signupEmployer(formData);
    } else {
      showAlert("Please accept the Terms and Conditions to proceed.");
    }
  }
});

orgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validated = {};
  alert.classList.add("d-none");
  alertMessage.innerText = "";

  checkName(orgName);
  checkEmail(orgEmail);
  checkPassword(orgPassword);
  checkPasswordsMatch(orgPassword, confirmOrgPassword);
  checkRequired([orgName, orgEmail, orgPassword, confirmOrgPassword]);

  if (!Object.values(validated).includes(false)) {
    localStorage.setItem("talentPool", "");
    localStorage.setItem(
      "talentPool",
      JSON.stringify({ orgName: orgName.value.trim() })
    );

    const formData = {
      orgEmail: orgEmail.value.trim(),
      orgPassword: orgPassword.value,
    };

    const signupOrgEmployer = async () => {
      let orgEmail = document.getElementById("orgEmail").value
      let orgPassword = document.getElementById("orgPassword").value
      axios({
        method: 'POST',
        url: 'https://api.lancers.app/v1/auth/employer-signup',
        data: {
          email: orgEmail,
          password: orgPassword
        }
      })
      .then((res) => {
        document.getElementById("orgSubmitBtn").innerText = 'Sign Up'
        let ok = 'success'
        if(res.data.status === ok) {
          $('#exampleModal').modal();
        } else {
          document.getElementById("orgSubmitBtn").innerText = 'Sign Up';
          showAlert(res.error)
        }
      })
      .catch((err) => {
          if(err.response.status === 403) {
            // console.log('responded with error', err.response.status)
            document.getElementById("orgSubmitBtn").innerText = 'Sign Up'
            showAlert('Email already exist!')
          } else if(err.response.status === 400) {
            if(email === '') {
              document.getElementById("orgSubmitBtn").innerText = 'Sign Up'
              showAlert('Email cannot be empty')
            } else {
            document.getElementById("orgSubmitBtn").innerText = 'Sign Up'
            // showAlert('Cannot have duplicate unique fields!')
            }
          } else if(err.response.status === 500) {
            document.getElementById("orgSubmitBtn").innerText = 'Sign Up'
            showAlert('Oops! Something went wrong. Please try again.')
          } else if(err.request) {
            // console.log('issue with request')
          } else {
            showAlert(err.message)
            console.log('Error', err.message)
          }
      })
    };

    // check for agreement to terms
    // add button loader
    if (document.getElementById("orgTerms").checked) {
      orgSubmitBtn.disabled = true;
      orgSubmitBtn.innerHTML =
        '<span class="spinner-border spinner-border" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>';
      setTimeout(() => {
        if (alertMessage.innerText === "") {
          // showAlert(
          //   "Sign Up failed, please check your internet and try again."
          // );
        }
        orgSubmitBtn.innerText = "Sign Up";
        orgSubmitBtn.disabled = false;
      }, 20000);

      // submit form
      signupOrgEmployer(formData);
    } else {
      showAlert("Please accept the Terms and Conditions to proceed.");
    }
  }
});


//Social auth implementation
githubSubmit.addEventListener("click", (e) => {

  const signupEmployerGithub = async () => {
    const API_URL = "https://api.lancers.app/v1/auth/github";

    const res = await fetch(API_URL, {
      method: "GET",
      //mode: "no-cors",
      //body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "User-Agent": "Developers Lancers",
      },
      redirect: "follow",
    });

    const data = await res.json();
    console.log(data)
    // if (data) {
    //   document.getElementById("githubID").innerText = "Sign up with GitHub";
    //   document.getElementById("githubID").disabled = false;
    // }
    // try {
    //   if (data.status === "success") {
    //     $("#exampleModal").modal();
    //   } else if (data.status === "error") {
    //     const message =
    //       data.error === "Someone has already registered this email"
    //         ? "Email already exists"
    //         : data.error === "Phone number already exist"
    //           ? "Phone number already exists"
    //           : data.error;
    //     showAlert(message);
    //   }
    // } catch (error) {
    //   showAlert(error);
    // }
  };


  signupEmployerGithub();
});
googleSubmit.addEventListener("click", (e) => {

});
githubSubmitOrg.addEventListener("click", (e) => {

});
googleSubmitOrg.addEventListener("click", (e) => {

});