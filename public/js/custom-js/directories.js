let currentRole = 'all';
function renderEmployee(employee) {
    const skillRender = (skill) => `<li>${skill}</li>`;
    const skillsRender = () => {
        let skillRenderString = '<ul>';

        if (employee.skills.length < 1) {
            skillRenderString += '<li>None</li>';
        }
        for (const skill of employee.skills) {
            skillRenderString += skillRender(skill.skill_description);
        }
        skillRenderString += '</ul>';
        return skillRenderString;
    }
    return `<div class="user-card ${employee.role}">
        <div class="user-card-inner">

            <div class="title">
                <div class="user-card-image-container">
                    <div class="user-card-image" style="background-image: url(${employee.picture_url});">
                    </div>
                </div>
                <div class="user-texts">
                    <h4>
                        ${employee.first_name + ' ' + employee.last_name}
                    </h4>
                    <h6> ${employee.roleDescription} </h6>
                </div>
            </div>
            <div class="profile">
                <a href="/employee-profile/${employee.employee_id}">View profile</a>
                <div class="skills">
                    ${skillsRender()}
                </div>
            </div>
        </div>
    </div>`;
}
function loadSkillsRender(skills) {
    let render = '';
    for (const skill of skills) {
        render += `<div class="form-check"> 
            <input type="checkbox" id="checkbox-${skill.split(' ').join('-')}" value="${skill}" class="form-check-input" onclick="filterEmployees()">
            <label for="checkbox-${skill.split(' ').join('-')}" class="form-check-label" ><span></span>${skill}</label>
        </div>`;
    }
    return render;
}
function loadAllSkills() {
    const skillsObject = {};
    const skills = [];
    for (const employee of employees) {
        for (const skill of employee.skills) {
            if (!skillsObject[skill.skill_description]) {
                skills.push(skill.skill_description);
                skillsObject[skill.skill_description] = true;
            }
        }
    }
    document.getElementById('skillsContent').innerHTML = loadSkillsRender(skills);

}
function filterEmployees() {
    const search = document.getElementById('search').value;
    const age = document.getElementById('age').value;
    const skillsContent = document.getElementById('skillsContent');
    const skillsCheckBoxes = skillsContent.querySelectorAll('input[type=checkbox]:checked');

    const skillsFilter = [];
    for (checkbox of skillsCheckBoxes) {
        skillsFilter.push(checkbox.value);
    }
    // console.log('okay', skillsFilter, 'Alright', skillsCheckBoxes)
    const filteredEmployees = employees.filter(employee => {
        for (const skill of employee.skills) {
            if (skillsFilter.includes(skill.skill_description)) {
                return true;
            }
        }
        return skillsFilter.length === 0;
    })
        .filter(employee => {
            if (age == 0) {
                return true;
            }
            return employee.age == age;
        })
        .filter(employee => {
            if (!search) {
                return true;
            }
        
            const searchArray = search.toLowerCase().split(' ');
            for (const s of searchArray) {
                if (employee.first_name.toLowerCase().startsWith(s) || employee.last_name.toLowerCase().startsWith(s)) {
                    return true;
                };
            }
            return false;
        })
        .filter(employee => {
            if (currentRole === 'all') {
                return true;
            }
            return employee.role == currentRole;
        })

    let innerHtml = '';
    for (const employee of filteredEmployees) {
        innerHtml += renderEmployee(employee);
    }
    document.getElementById('user-cards').innerHTML = innerHtml;
    document.getElementById('number-interns').innerHTML = `${filteredEmployees.length} interns`;
}
const roleList = ['all', 'designer', 'mobile', 'frontend', 'backend']
function filterRoles(role) {
    const rolesFilter = document.getElementById('roles-filter');
    const filtters = rolesFilter.getElementsByTagName('li');
    for (const filter of filtters) {
        filter.classList.remove('active');
    }
    filtters[role].classList.add('active');
    currentRole = roleList[role];
    filterEmployees();
}


// <div class="user-card-image" style="background-image: url(${employee.picture_url});"></div>