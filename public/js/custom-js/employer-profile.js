const { getemployerdetails: [getemployerdetails] } = JSON.parse(localStorage.getItem("tpAuth"));
const userInformation = JSON.parse(localStorage.getItem("tpAuth"));
const userInfo = JSON.parse(atob(userInformation.token.split('.')[1]));
const pTags = document.querySelectorAll('p');
const h3Tags = document.querySelectorAll('h3');
const imgTags = document.querySelectorAll('img');
const spanTags = document.querySelectorAll('span');
const h6Tags = document.querySelectorAll('h6');

let [employerName] = h6Tags;
let [ ,companyLogoSpan ,] = spanTags;
let [ employerImage, ,companyLogo ,] = imgTags;
let [companyName] = h3Tags;
let [ , companyCategory, companyLocation, email, , description ] = pTags;

employerName.innerHTML = getemployerdetails.employer_name;
employerImage.src = getemployerdetails.employer_photo;
companyLogo.src = getemployerdetails.employer_photo;
companyLogoSpan.style.display = 'none';
companyName.innerHTML = getemployerdetails.Company_category.category_name;
companyCategory.innerHTML = getemployerdetails.Company_category.description;
companyLocation.innerHTML = getemployerdetails.employer_address;
email.innerHTML = getemployerdetails.employer_email;
description.innerHTML = getemployerdetails.Company_category.description;

const saveProfile = async () => {

    const getEditProfileModalData = document.querySelectorAll('input');
    let [companyName, companyTagLine, companyEmail, companyLocation] = getEditProfileModalData;
    let imageData = document.getElementById('inputGroupFile04');
    ([imageData] = imageData.files);

    try {

        const updateProfileUrl = `https://api.lancers.app/v1/employer/update`;

        const fileUploadData = new FormData();
        fileUploadData.append('photo', imageData);
        fileUploadData.append('employer_name', companyName.value);
        fileUploadData.append('employer_email', companyEmail.value);
        fileUploadData.append('employer_address', companyLocation.value);
        fileUploadData.append('employer_id', userInfo.userTypeId);

        const { data } = await axios({
            method: 'PUT',
            url: updateProfileUrl,
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${userInformation.token}`,
            },
            data: fileUploadData
          });

          if (data.status === 'success') {
              alert(data.message);
          }

    } catch (e) {
        console.log(e);
    }
};