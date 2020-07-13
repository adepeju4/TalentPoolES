let userInformation = JSON.parse(localStorage.getItem("tpAuth"));
const userInfo = JSON.parse(atob(userInformation.token.split('.')[1]));
if (!userInformation) {
  alert('Error! User Information not found, please sign in again.');
  location.href = '/employee-sign-in';
}
const getEmployeeDetails = async () => {
    // const employeeUrl = `https://api.lancers.app/v1/employee/getemployee/${userInfo.userTypeId}`;
    const employeeUrl = `https://api.lancers.app/v1/employee/profile/${userInfo.userTypeId}`;
    try {
      const { data } = await axios({
        method: 'GET',
        url: employeeUrl,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${userInformation.token}`,
        },
      });
      console.log(data.data)
      if (data.status === 'success') {
        const [employeeName] = document.getElementsByClassName('text-primary m-0');
        let [employeePhoto] = document.getElementsByClassName('img-fluid mr-2');
        employeePhoto = employeePhoto.querySelector('img');
        employeePhoto.src = data.data.employee.picture_url;
        employeeName.innerHTML = `${data.data.employee.first_name} ${data.data.employee.last_name}`;
        updateEmployeeDOM(data.data);
        // userInformation['getemployeedetails'] = data.getemployerdetails;
        // localStorage.setItem('tpAuth', JSON.stringify(userInformation))
      }
    } catch (error) {
      console.log(error);
      alert("Opps! An error seems to have occured. Try again later. Thanks!");
    }
};
window.addEventListener('DOMContentLoaded', (event) => {
    getEmployeeDetails();
});
const updateEmployeeDOM = ({ employee }) => {
    const pTags = document.querySelectorAll('p');
    let [ , , , employeeName, employeeLocation, employeeEmail, employeePhone, ] = pTags;
    employeeName.innerHTML = employee.first_name;
    employeeLocation.innerHTML = 'n/a';
    employeeEmail.innerHTML = 'no email';
    employeePhone.innerHTML = employee.phone_no;
};