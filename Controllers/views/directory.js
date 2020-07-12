const axios = require('axios');

async function loadEmployees() {
    try {
        const { data } = await axios.get('https://api.lancers.app/v1/employee/all');

        return data.data.all_employee_data;
    } catch (e) {
        console.log(`Error occured: ${e.message || e}`);
    }
    return [];

}

exports.directory = async (request, response) => {
    const devRole = ['frontend', 'designer', 'backend', 'mobile'];
    const devRoleDescription = ['Frontend Developer', 'Designer', 'Backend Developer', 'Mobile Developer'];
    const employees = (await loadEmployees()).map((employee) => {
        const randomNumber = Math.floor(Math.random() * 4);

        return {
            ...employee, 
            picture_url: employee.picture_url||'https://i.imgur.com/tdi3NGa.png',
            role: devRole[randomNumber],
            roleDescription: devRoleDescription[randomNumber],
        };
    });
    response.render('Pages/directory', {
        pageName: 'Directory',
        employees: employees,
    });
}
