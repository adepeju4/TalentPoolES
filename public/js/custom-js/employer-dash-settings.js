window.addEventListener('load',()=>{
const form = document.getElementById ('changePassword');
form.addEventListener ('submit', (event)=>{
    if (form.checkValidity()===false){
        event.stopPropagation();
        event.preventDefault();

    }
    form.classList.add('was-validated');
}, false)
    

}, false)