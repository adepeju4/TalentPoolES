document.addEventListener('DOMContentLoaded', getUser);

function getUser() {
  const auth = localStorage.getItem('tpAuth');
  const BASE_URL = '/v1';
  let userToken = null;
  let user_id = null;

  if (auth) {
    const f = JSON.parse(auth);
    userToken = f.token;
    user_id = f.userTypeId;
    // console.log(userToken)
  } else {
    alert('Authentication Error! Redirecting....');
    window.location.href = '/';
    return;
  }

  /////////////////////////////////////////////////////////////////
  // Axios interrceptor for checking user auth status
  axios.interceptors.request.use((config) => {
    //   console.log("Token Here : ", userToken);
    if (!userToken) {
      alert('Authentication Error! Redirecting....');
      window.location.href = '/';
      return;
    }
    config.headers.common.Authorization = `Bearer ${userToken}`;
    return config;
  });
  /////////////////////////////////////////////////////////////////

  const getProfile = async () => {
    if (!userToken || !user_id) {
      alert('Authentication Error! Redirecting....');
      return;
    }

    let res = await axios
      .get(`${BASE_URL}/employee/profile/${user_id}`)
      .then((res) => {
        console.log(res);
        let data = res.data.data.employee;
        console.log(data.first_name);
        console.log(user_id);
        if (
          window.location.pathname == '/employee-profile' ||
          window.location.pathname == '/employee-dashboard' ||
          window.location.pathname == '/employee-employers' ||
          window.location.pathname == '/employee-settings'
        ) {
          let fullName = document.querySelector('#full-name');
          let email = document.querySelector('#employee-email');
          let employeeimage = document.querySelector('#employee-img');
          let employeeCv = document.querySelector('#employee-cv');
          let internId = document.querySelector('#intern-id');
          let phone = document.querySelector('#phone');
          let availability = document.querySelector('#availability');
          let displayName = document.querySelector('#employee-name');

          displayName.innerHTML = data.first_name + ' ' + data.last_name;
          fullName.innerHTML = data.first_name + ' ' + data.last_name;
          phone.innerHTML = data.phone_no;
          // firstName.innerHTML = res.data.data.first_name;
          internId.innerHTML = data.hng_id;
          availability.innerHTML = data.avaliability;
          employeeimage.src = data.picture_url;
          employeeCv.href = data.employee_cv;

          if (!employeeCv.href || employeeCv.href === '') {
            document.getElementById('cv-message').innerHTML =
              'File not uploaded yet';
          }
        }

        return res;
      })
      .catch((error) => {
        console.log('Error : ', error);
      });
  };

  getProfile();

  const getSkills = async () => {
    if (!userToken || !user_id) {
      alert('Authentication Error! Redirecting....');
      return;
    }

    let res = await axios
      .get(`${BASE_URL}/employee/${user_id}/skill`)
      .then((res) => {
        let { data } = res.data;
        if (data.length == 0) {
          document.getElementById('skill-message').innerHTML =
            'You have not added your skills';
        } else {
        }
      })
      .catch((error) => {
        console.log('Error : ', error);
      });
  };

  getSkills();
}
