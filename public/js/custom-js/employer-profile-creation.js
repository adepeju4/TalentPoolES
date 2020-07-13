const employerProfileCreationForm = document.querySelector('#employerProfileCreation');
const userInformation = JSON.parse(localStorage.getItem("tpAuth"));

const userInfo1 = JSON.parse(atob(userInformation.token.split('.')[1]));
const { userTypeId, userRole } = userInfo1;

const [navBar] = document.getElementsByClassName('navbar-brand');

if (userRole === 'ROL-EMPLOYEE') {
    if (userTypeId)  {
        navBar.href = '/employee-dashboard';
    } else {
        navBar.href = '/employee-profileCreation';
    }
}

if (userRole === 'ROL-EMPLOYER') {
  if (userTypeId)  {
      navBar.href = '/employer-dashboard';
  } else {
      navBar.href = '/employer-create-profile';
  }
} 
// getdata();
// Get data for the company types
// const requestOptions = {
//   headers: {
//     "Content-Type": "application/json; charset=UTF-8",
//     "User-Agent": "Developers Lancers",
//     Authorization: `Bearer ${userInformation.token}`,
//   }
// }
// const url = 'https://api.lancers.app/v1/company/category';
// async function getdata(){
//   try {
//     const companyTypes = await fetch(url , requestOptions);
//     const companyData = await companyTypes.json();

//     let dropdown = document.getElementById('company_category');
//     let option;
//     for (let i = 0; i < companyData.length; i++) {
//       option = document.createElement('option');
//       option.text = companyData[i].name;
//       option.value = companyData[i].abbreviation;
//       dropdown.add(option);
//     }
    
//   } catch (error) {
//     // Display error
//     showAlert(error)
//   }
// }


employerProfileCreationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userInfo = JSON.parse(atob(userInformation.token.split('.')[1]));
  const organizationLogo = document.querySelector('#organization_logo').value
  const employerType = document.querySelector('#employer_type').value
  const organizationCategory = document.querySelector("#company_category").value
  const organizationName = document.querySelector("#organization_name").value
  const organizationPhone = document.querySelector('#organization_phone').value
  const organizationEmail = document.querySelector('#organization_email').value
  const description = document.querySelector("#description").value
  const organizationAddress = document.querySelector('#organization_address').value
  const organizationWebsite = document.querySelector("#website_url").value
  const userId = userInfo.userId;

  if (organizationLogo && employerType && organizationCategory && 
    organizationName && organizationPhone && organizationEmail && 
    description && organizationAddress && organizationWebsite ) {
      employerProfile();
    async function employerProfile(){
      const requestOptions = {
        method: "POST",
        body: {
          "photo": organizationLogo,
          "organizationName": organizationName,
          "companyCategoryId": organizationCategory,
          "employerType": employerType,
          "description": description,
          "companyPhone": organizationPhone,
          "companyEmail": organizationEmail,
          "companyAddress": organizationAddress,
          "website": organizationWebsite,
          "userId": userId
        },
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "User-Agent": "Developers Lancers",
          Authorization: `Bearer ${userInformation.token}`,
        }
      }
      const url = 'https://api.lancers.app/v1/employer/create';
      try {
        const createEmp = await fetch(url , requestOptions);
        const resp = await createEmp.json();
        let i = 'success'
        if (resp.status === i) {
          // Redirect to dashboard
          window.location.replace('/employer-dashboard')
        }else{
          showAlert(resp.message)
        }
      } catch (error) {
        // Display error
        showAlert(error)
      }
    }
  }else{
    showAlert('Fill in all Fields.')
  }
})

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