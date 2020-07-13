
const userInformation = JSON.parse(localStorage.getItem("tpAuth"));
const userInfo = JSON.parse(atob(userInformation.token.split('.')[1]));

if (!userInformation) {
    alert('Error! User Information not found, please sign in again.');
    location.href = '/employer-sign-in';
  }

// store all added documents and display in table
let documentsArray = [];

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Get the forms we want to add validation styles to
        const forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        const validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', async function(event) {
                const [name, number, file] = document.querySelectorAll('form input');
                let addValidation = true;

                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else if (form.checkValidity()) {

                    // add to array
                    const imageData = readImage();
                    if (imageData) {
                        documentsArray.push({
                            file: imageData,
                            name: name.value,
                            number: number.value,
                        });

                        const tbody = document.querySelector('tbody');
                        newTableRow(tbody, { name: name.value, number: number.value });
                        const clearForm = document.querySelector('form');
                        clearForm.className = 'needs-validation';
                        addValidation = false;
                        name.value = '';
                        number.value = '';
                        labelText('');
                        clearFileInput(file);
                    }

                }

                if (addValidation) {
                    form.classList.add('was-validated');
                }
                event.preventDefault();
            }, false);
        });
    }, false);
})();

const newTableRow = (container, data) => {

    const tr = document.createElement('tr');
    tr.setAttribute('id', `id${data.number}`);
    let td = document.createElement('td');

    let textNode = document.createTextNode(data.name);
    td.appendChild(textNode);
    tr.appendChild(td);

    td = document.createElement('td');

    textNode = document.createTextNode(data.number);
    td.appendChild(textNode);
    tr.appendChild(td);

    const button = document.createElement('button');
    button.setAttribute('class', 'btn btn-danger');
    const buttonEventValue = `id${data.number}`;
    button.setAttribute('onclick', `removeTableRow('${buttonEventValue}')`);

    textNode = document.createTextNode('Remove');
    button.appendChild(textNode);
    td = document.createElement('td');
    td.setAttribute('style', 'text-align: right; padding-right: 12px;'); 
    td.appendChild(button);
    tr.appendChild(td);

    const newPosition = container.children.length;
    container.insertBefore(tr, container.children[newPosition]);

};

const removeTableRow = async (rowId) => {

    // filter array to remove document object

    const checkDocumentId = (data) => {
        return `id${data.number}` != rowId;
    };

    documentsArray = await documentsArray.filter(checkDocumentId);

    const rowTarget = document.getElementById(rowId);
    rowTarget.style.display = 'none';
};

const clearFileInput = (ctrl) => {
    try {
        ctrl.value = null;
    } catch(ex) { }
    if (ctrl.value) {
        ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
    }
};

const readImage = () => {
    const imageData = document.getElementById("customFile");
    const files = imageData.files;

    if (!files.length) return;

    const [imageFile] = files;
    const fileNameArray = imageFile.name.split('.');
    const fileExtension = fileNameArray[fileNameArray.length - 1].toLowerCase();
    if (['jpg', 'jpeg', 'png'].includes(fileExtension) === false) {
        alert('This file is not in a JPG, JPEG or PNG format.');
        return;
    }

    if (files.length) {
        // const [labelText] = document.getElementsByClassName('custom-file-label');
        // labelText.innerText = imageFile.name
        labelText(imageFile.name);
    }

    return imageFile;
};

const labelText = (value) => {
    const [labelText] = document.getElementsByClassName('custom-file-label');
    labelText.innerText = value
};

const uploadSingleImage = async (imageData, data) => {
    try {
        const reader = new FileReader();

        reader.readAsDataURL(imageData);

        const documentUploadUrl = 'https://api.lancers.app/v1/employer/uploaddocument';
        const fileUploadData = new FormData();
        fileUploadData.append('image_document', imageData);
        fileUploadData.append('document_name', data.name);
        fileUploadData.append('document_number', data.number);
        fileUploadData.append('employer_id', data.userTypeId);

        return await axios({
            method: 'POST',
            url: documentUploadUrl,
            headers: {
            accept: 'application/json',
            // 'content-type': 'application/json',
            'Authorization': `Bearer ${data.token}`,
            },
            data: fileUploadData,
        });

    } catch (e) {
        return e;
    }
};

const batchUpload = async () => {
    const upload = document.getElementById('upload');
    const loader = document.getElementById('loader');
    upload.style.display = 'none';
    loader.style.display = 'block';

    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5b2JhbWlhbGFkZW5veWVAeWFob28uY29tIiwidXNlcklkIjoiMTljNzNmNDYtMWRhNy00NDVhLWFhZmEtODExYTc3ZTRmNWQwIiwidXNlclJvbGUiOiJST0wtRU1QTE9ZRUUiLCJ1c2VyVHlwZUlkIjoiN2EyZWQ4MTQtZDc4Mi00ODZlLTlmYzQtMTk3ZTA2ZDBhZTg4IiwiaWF0IjoxNTk0MzExOTkxLCJleHAiOjE1OTQzOTgzOTF9.sxHq3-mMQAnjDbL4fe_ktIxq_f3OIYDfqXt5FOqF_2k';
    // const userTypeId = 'bf160643-3ea7-4b93-8532-33df5248972d';

     for (const documentObject of documentsArray) {

        const payload = {
            userTypeId: userInfo.userTypeId,
            token: userInformation.token,
            name: documentObject.name,
            number: documentObject.number,
        };

        try {

            const { data } = await uploadSingleImage(documentObject.file, payload);
            console.log(data.message);

        } catch (e) {
            console.log(e);
        }

     }

     loader.style.display = 'none';
     upload.style.display = 'block';

};
