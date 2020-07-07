const employeeProfileCreationForm = document.querySelector('#employeeProfileCreation');
const userType = document.querySelector("#userType");
const hngId = document.querySelector("#hngId");

const userInformation = JSON.parse(localStorage.getItem("user"));

userType.addEventListener('click', (e) => {
    for (var i = 0, len = userType.options.length; i < len; i++) {
        opt = userType.options[i];
        if (opt.selected === true) {
            if (opt.value == "hng") {
                hngId.removeAttribute('disabled');
            } else {
                hngId.setAttribute('disabled', true);
            }
        }
    }
})

const employeeAvailability = document.querySelector('#employeeAvailability');
function getAvailability() {
    let opt;
    for (var i = 0, len = employeeAvailability.options.length; i < len; i++) {
        opt = employeeAvailability.options[i];
        if (opt.selected === true) {
            break;
        }
    }
    return opt.innerText;
}
// employeeAvailability.addEventListener('click', (e) => {
//    console.log(getAvailability()) 
// })

const userInfo = JSON.parse(atob(userInformation.token.split('.')[1]));



employeeProfileCreationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const employeeImage = document.querySelector('#employeeImg').value,
        employeeFirstName = document.querySelector("#employeeFirstName").value,
        employeeLastName = document.querySelector('#employeeLastName').value,
        userTypeName = document.querySelector('#userType').value,
        hngIdValue = document.querySelector("#hngId").value,
        employeeAge = document.querySelector('#employeeAge').value,
        employeeAvailability = getAvailability(),
        dob = document.querySelector('#employeeDOB').value,
        employeeCv = document.querySelector("#employeeCV").value,
        userPhoneNumber = document.querySelector("#employeePhone").value,
        userId = userInfo.userId;
        // userId = 'eee5269b-f4e7-4058-bcf5-77b4b2834c97'

    console.log(employeeImage)

    fetch('https://api.lancers.app/v1/employee/profile', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "User-Agent": "Developers Lancers",
            Authorization: `Bearer ${userInformation.token}`,
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9kdXR1c2lub21vd3VubWlAZ21haWwuY29tIiwidXNlcklkIjoiZWVlNTI2OWItZjRlNy00MDU4LWJjZjUtNzdiNGIyODM0Yzk3IiwidXNlclJvbGUiOiJST0wtRU1QTE9ZRUUiLCJ1c2VyVHlwZUlkIjoiOWM2MzFmYzctNjViNC00ZDFiLTlkNGEtMTE4OTUxZjRkMzcxIiwiaWF0IjoxNTk0MTAxNjI1LCJleHAiOjE1OTQxODgwMjV9.V5y8ztfmM-M48KOJlL2ZjfZuQ9y8iSm-ByP9bUsskXc`,
        },
        body: JSON.stringify({
            "firstName": employeeFirstName,
            "lastName": employeeLastName,
            "userType": userTypeName,
            "hngId": hngIdValue,
            "age": employeeAge,
            "phoneNo": userPhoneNumber,
            "pictureUrl": employeeImage,
            "avaliability": employeeAvailability,
            "dateOfBirth": dob,
            "employeeCv": employeeCv,
            "userId": userId
        })
    })
        .then(res => res.json())
        .then(data => 
            console.log(data));
});


