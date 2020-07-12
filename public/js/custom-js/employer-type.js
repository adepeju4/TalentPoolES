const employerSelect = document.querySelector('.employer-type');
const nextBtn = document.querySelector('.select-next');


const loadProfile = (e) => {
    // e.preventDefault(); 
    if (employerSelect.value === 'individual') {
        // nextBtn.href = '../src/employer-profile-page-creation1.html';
        nextBtn.href = './employer-individual';
        // windows.location.href = './employer-individual';

    }
    else if (employerSelect.value === 'company') {
        // nextBtn.href = '../src/employer profile creation (company)/employer-company1.html';
        nextBtn.href = './employer-company';
        // windows.location.href = './employer-company';
    }
    else  {
        nextBtn.href = 'javascript:void(0)';
    }
}


nextBtn.addEventListener('click', loadProfile)