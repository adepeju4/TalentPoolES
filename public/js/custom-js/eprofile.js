const editProfileForm = document.querySelector('#edit-profile');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
// const location = document.querySelector('#location')
// const track = document.querySelector('#track')
const cv = document.querySelector('#cv');
const backend = document.querySelector('backend');
const frontend = document.querySelector('frontend');
const mobile = document.querySelector('mobile');
const design = document.querySelector('design');
const addSkillForm = document.querySelector('#add-skills');
// const userInformation = JSON.parse(localStorage.getItem("user"));

const userInformation = JSON.parse(localStorage.getItem('tpAuth'));

const employeename = document.querySelector('.employeename');
const employeeName = document.querySelector('.employeeName');
const employeeSkill = document.querySelector('.employeeSkill');
const employeeLocation = document.querySelector('.employeeLocation');
const employeeEmail = document.querySelector('.employeeEmail');
const employeeProfilePhoto = document.querySelector('.employeeProfilePhoto');

if (!userInformation) {
  alert('Error! User Information not found, please sign in again.');
  location.href = '/employee-sign-in';
}

const errorMessage = document.querySelector('#error-message');
const successMessage = document.querySelector('#success-message');

if (editProfileForm) {
  editProfileForm.addEventListener('submit', onsubmit);
}

function onsubmit(e) {
  e.preventDefault();

  if (!firstName.value || !lastName.value || !email.value) {
    console.log('error');
    errorMessage.innerHTML = 'Please fill all the necessary details';
    if (errorMessage.style.display == 'none') {
      errorMessage.style.display = 'block';
    }
    setTimeout(function () {
      errorMessage.style.display = 'none';
    }, 2000);
  } else {
    console.log('yeah');
    errorMessage.innerHTML = 'Your details are being uploaded';
    if (successMessage.style.display == 'none') {
      successMessage.style.display = 'block';
    }
    setTimeout(function () {
      $('#staticBackdrop').modal('hide');
      successMessage.style.display = 'none';
    }, 2000);
    // window.location.replace('/employee_profile.html')
  }
}

function getEmployeeDetails() {
  let employeeUrl = `/v1/employee/profile/${userInformation.userTypeId}`;
  axios({
    method: 'GET',
    url: employeeUrl,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${userInformation.token}`,
    },
  }).then((data) => {
    console.log(data.data.data.employee);
    employeename.innerHTML = data.data.data.employee.first_name;
    employeeName.innerHTML =
      data.data.data.employee.first_name + data.data.data.employee.last_name;

    if (data.data.data.employee.email === undefined) {
      employeeEmail.innerHTML = 'No email set';
    } else {
      employeeEmail.innerHTML = data.data.data.employee.email;
    }

    if (data.data.data.employee.skill === undefined) {
      employeeSkill.innerHTML = 'No skill set';
    } else {
      employeeSkill.innerHTML = data.data.data.employee.skill;
    }

    if (data.data.data.employee.location === undefined) {
      employeeLocation.innerHTML = 'No location set';
    } else {
      employeeLocation.innerHTML = data.data.data.employee.location;
    }

    employeeProfilePhoto.src = data.data.data.employee.picture_url;
  });
}

getEmployeeDetails();

Filevalidation = () => {
  const fi = document.getElementById('file');
  const size = document.querySelector('#size');
  const fileMessage = document.querySelector('#file-message');
  // Check if any file is selected.
  if (fi.files.length > 0) {
    for (let i = 0; i <= fi.files.length - 1; i++) {
      const fsize = fi.files.item(i).size;
      const file = Math.round(fsize / 1024);
      // The size of the file.
      if (file >= 2048) {
        fileMessage.innerHTML =
          'File too Big, please select a file less than 600kb ';
        setTimeout(function () {
          fileMessage.style.display = 'none';
        }, 4000);
        // alert("File too Big, please select a file less than 4mb");
      } else if (file < 550) {
        fileMessage.innerHTML =
          'File too small, please select a file greater than 2mb';
        // alert("File too small, please select a file greater than 2mb");
        setTimeout(function () {
          fileMessage.style.display = 'none';
        }, 4000);
      } else {
        document.getElementById('size').innerHTML = '<b>' + file + '</b> KB';
      }
    }
  }
};

const userInfo = JSON.parse(atob(userInformation.token.split('.')[1]));

addSkillForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let skill = addSkillForm.querySelector('input').value;
  // const skillUrl = `/v1/employee/skill/${userInfo.userTypeId}`;
  const skillUrl = `/v1/employee/skill`;

  axios({
    method: 'POST',
    url: skillUrl,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${userInformation.token}`,
    },
    data: JSON.stringify({
      skill_description: skill,
      employee_id: userInfo.userTypeId,
    }),
  })
    .then(({ data }) => {
      if (data.status === 'success') {
        $('#exampleModal').modal('hide');
        skill = '';
        alert('Skill Added');
        buildList([
          { skill_description: data.data.skill_description, id: data.data.id },
        ]);
      } else {
        alert('Skill not added, please try again.');
      }
    })
    .catch((e) => {
      alert(e.message);
    });
});

let myArray = [];

function buildList(data) {
  const list = document.querySelector('.lists');

  data.forEach((skills) => {
    const row = `
      <li>
        <div class="list-item">
            <span class="mr-2">
                <img src="../img/iprofile/ic_sharp-verified.svg" alt="">
            </span>
            ${skills.skill_description}
        </div>
        <div class="list-trash">
            <!-- <img src="../img/iprofile/carbon_trash-can.svg" alt=""> -->
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 12.8789H14.5V21.2886H13V12.8789Z" fill="#084482"/>
            <path d="M17.5 12.8789H19V21.2886H17.5V12.8789Z" fill="#084482"/>
            <path d="M7 8.67432V10.0759H8.5V24.0921C8.5 24.4639 8.65804 24.8204 8.93934 25.0832C9.22064 25.3461 9.60218 25.4938 10 25.4938H22C22.3978 25.4938 22.7794 25.3461 23.0607 25.0832C23.342 24.8204 23.5 24.4639 23.5 24.0921V10.0759H25V8.67432H7ZM10 24.0921V10.0759H22V24.0921H10Z" fill="#084482"/>
            <path d="M13 5.87109H19V7.27271H13V5.87109Z" fill="#084482"/>
            </svg>
        </div>
      </li>
        `;
    list.innerHTML += row;
  });
}

async function getAllSkillsForIndividuals() {
  const skillUrl = `/v1/employee/${userInfo.userTypeId}/skill`;
  try {
    const { data } = await axios({
      method: 'GET',
      url: skillUrl,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${userInformation.token}`,
      },
    });

    if (data.status === 'success') {
      myArray = data.data;
      buildList(myArray);
    }
  } catch (error) {
    // alert("Opps! An error seems to have occured. Try again later. Thanks!");
  }
}

getAllSkillsForIndividuals();
