const employerCompanyForm = document.querySelector('#employerCompany');
const userInformation = JSON.parse(localStorage.getItem('tpAuth'));

employerCompanyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userInfo = JSON.parse(atob(userInformation.token.split('.')[1]));
  const companyName = document.querySelector('#companyname').value;
  const companyCategory = document.querySelector('#companytype').value;
  const companyAddress = document.querySelector('#companyaddress').value;
  const companyEmail = document.querySelector('#companyemail').value;
  const companyPhone = document.querySelector('#companyphone').value;
  const description = document.querySelector('#desc').value;
  const log = document.querySelector('#logo');
  const logo = log.files.item(0);
  const website = document.querySelector('#website').value;
  const linkedin = document.querySelector('#linkedin').value;
  const facebook = document.querySelector('#facebook').value;
  const twitter = document.querySelector('#twitter').value;
  const instagram = document.querySelector('#instagram').value;
  const userId = userInfo.userId;

  if (
    companyName &&
    companyCategory != 'empty' &&
    companyAddress &&
    companyEmail &&
    companyPhone &&
    description &&
    logo &&
    website &&
    linkedin &&
    facebook &&
    twitter &&
    instagram
  ) {
    console.log('id', userId, companyCategory);
    employerProfile();
    async function employerProfile() {
      try {
        var SubmitData = new FormData();
        SubmitData.append('photo', logo);
        SubmitData.append('employer_name', companyName);
        SubmitData.append('company_category_id', companyCategory);
        SubmitData.append('employer_type', 'Company');
        SubmitData.append('description', description);
        SubmitData.append('employer_phone', companyPhone);
        SubmitData.append('employer_email', companyEmail);
        SubmitData.append('employer_address', companyAddress);
        SubmitData.append('user_id', userId);
        SubmitData.append('facebook', facebook);
        SubmitData.append('twitter', twitter);
        SubmitData.append('linkedin', linkedin);
        SubmitData.append('instagram', instagram);
        SubmitData.append('website', website);
        const { data } = await axios({
          method: 'POST',
          url: '/v1/employer/create',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInformation.token}`,
          },
          data: SubmitData,
        });
        if (data.status === 'success') {
          window.location.replace('/employer-dashboard');
        } else {
          console.log('Ff', logo);
          showAlert(resp.message);
        }
      } catch (error) {
        console.log('Ff', logo);
        showAlert(error);
      }
    }
  } else {
    showAlert('Fill in all Fields.');
  }
});

// show alert message on page
function showAlert(message) {
  const alert = document.getElementById('alert');
  const alertMessage = document.getElementById('alertMessage');

  alert.classList.remove('d-none');
  alertMessage.innerText = message;

  setTimeout(() => {
    hideAlert();
  }, 6000);
}

function hideAlert() {
  document.getElementById('alert').classList.add('d-none');
}

function showFile() {
  var input = document.getElementById('logo');
  var output = document.getElementById('logoname');
  var children = input.files.item(0).name;
  output.innerHTML = '<span> - ' + children + '</span>';
  console.log('l', children);
}

// let myArray = [];

// function buildList(data) {
//   const list = document.querySelector("#company-category");

//   data.forEach((cat) => {
//     const row = `
//       <option value=${cat.category_id}>${cat.category_name}</option>
//         `;
//     list.innerHTML += row;
//   });
// }

// async function getCompanies() {
//   const Url = `/v1/company/category`;
//   try {
//     const { data } = await axios({
//       method: "GET",
//       url: Url,
//       headers: {
//         "Content-Type": "application/json; charset=UTF-8",
//         Authorization: `Bearer ${userInformation.token}`,
//       },
//     });
//     if (data.status === "success") {
//       console.log(data)
//       myArray = data.data;
//       buildList(myArray);
//     }
//   } catch (error) {
//     alert("Opps! An error seems to have occured. Try again later. Thanks!");
//   }
// }

// getCompanies();
