let userInformation = JSON.parse(localStorage.getItem('tpAuth'));
const userInfo = JSON.parse(atob(userInformation.token.split('.')[1]));

if (!userInformation) {
  alert('Error! User Information not found, please sign in again.');
  location.href = '/employee-sign-in';
}

const getEmployerDetails = async () => {
  const employerUrl = `/v1/employer/getemployer/${userInfo.userTypeId}`;
  try {
    const { data } = await axios({
      method: 'GET',
      url: employerUrl,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${userInformation.token}`,
      },
    });

    if (data.status === 'success') {
      const [employerName] = document.getElementsByClassName(
        'text-primary m-0',
      );
      let [employerPhoto] = document.getElementsByClassName('img-fluid mr-2');
      employerPhoto = employerPhoto.querySelector('img');
      employerPhoto.src = data.getemployerdetails[0].employer_photo;
      employerName.innerHTML = data.getemployerdetails[0].employer_name;
      userInformation['getemployerdetails'] = data.getemployerdetails;
      localStorage.setItem('tpAuth', JSON.stringify(userInformation));
    }
  } catch (error) {
    console.log(error);
    alert('Opps! An error seems to have occured. Try again later. Thanks!');
  }
};

window.addEventListener('DOMContentLoaded', (event) => {
  getEmployerDetails();
});
