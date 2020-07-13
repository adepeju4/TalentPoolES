$(document).ready(function () {
  const token = localStorage.getItem('tAuth');
  axios
    .get('/v1/employee/all', {
      headers: {
        Authorization: 'Bearer ' + token,
        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxOGEwYTk5Yy04MThkLTQ2YTYtOGJmYi1iMTdhYjczYWUyYTkiLCJ1c2VyUm9sZSI6IlJPTC1BRE1JTiIsInVzZXJUeXBlSWQiOm51bGwsImlhdCI6MTU5NDM5MjAxNiwiZXhwIjoxNTk0NDc4NDE2fQ.R5lajeNdXhiWiIKXm3MDhIJWfoJ2t7Mkhjb0BrnCzYQ"
      },
    })
    .then(({ data }) => {
      let employees_count = [];
      let available_employees_count = [];
      let hired_employees_count = [];

      data.data.all_employee_data.forEach((data) => {
        employees_count.push(data);
        if (data.avaliability.toLowerCase() == 'not-available') {
          hired_employees_count.push(data);
        }
        if (data.avaliability.toLowerCase() == 'available') {
          available_employees_count.push(data);
        }
        document.querySelector('#table-body-data').innerHTML += `
          <tr>
                                <td class="align-middle user-id">${data.id}</td>
                                <td class="align-middle user-name">
                                <img src="${
                                  data.picture_url
                                }" alt="" class="mr-1 table-img" width="34px" height="34px"/>
                                ${data.first_name} ${data.last_name} 
                                </td>
                                <td class="align-middle ui-table">UI/UX Designer</td>
                                <td class="align-middle re-table">Remote</td>
                                <td class="align-middle dt-table">${
                                  data.createdAt.split('T')[0]
                                }</td>
                                <td class="align-middle img-edit">
                                    <span class="stats-btn p-2 mr-md-3 available-txt rounded">${
                                      data.avaliability
                                    }</span>
                                    <button class="btn btn-datatable btn-icon btn-transparent-dark mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-more-vertical">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="12" cy="5" r="1"></circle>
                                            <circle cx="12" cy="19" r="1"></circle>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
          `;
      });
      $('#all_employees').html(employees_count.length);
      $('#hired_employees_count').html(hired_employees_count.length);
      $('#available_employees_count').html(available_employees_count.length);
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
});
