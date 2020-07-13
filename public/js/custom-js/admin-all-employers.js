$(document).ready(function () {

  const token = localStorage.getItem("tpAuth");
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluNkBnbWFpbC5jb20iLCJ1c2VySWQiOiJiZWVjYThiYi01NzJiLTRiNzgtYjE0ZS1jOGY2Yjk4ODcwOTYiLCJ1c2VyUm9sZSI6IlJPTC1BRE1JTiIsInVzZXJUeXBlSWQiOm51bGwsImlhdCI6MTU5NDMyNTE0MSwiZXhwIjoxNTk0NDExNTQxfQ.T6LUrZMsedVVk0Az_FluYppQsXwmaUoxpBJ5cbWDKSU";

  var individuals_array = [];
  var company_array = [];

  axios
    .get("https://api.lancers.app/v1/employer/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(({data}) => {
      data.data.data.forEach((data) => {
        if (data.employer_type.toLowerCase() == "individual") {
          individuals_array.push(data.employer_type);
        }

        if (data.employer_type.toLowerCase() == "company") {
          company_array.push(data.employer_type);
        }

        document.querySelector("#table-body-data").innerHTML += `
        <tr>
        <td
        id="employer_id"
        class="align-middle pl-4 pr-5 hide_content"
      >
        ${data.id}
      </td>
      <td
        class="d-flex justify-content-start align-items-center align-middle"
      >
        <img
          class="img-fluid rounded"
          id="employer_photo"
          width="60px"
          height="60px"
          src="${data.employer_photo}"
          alt="employer logo"
        />
        <span
          class="d-inline-block align-middle w-max-content pl-3"
          id="employer_name"
          >${data.employer_name}
          <p class="sub-text" id="employer_date_joined">
            ${data.createdAt.split("T")[0]}
          </p></span>
      </td>
      <td class="align-middle talent-text-muted hide_content"
                    id="employer_type"
                  >
                    ${data.employer_type}
                  </td>
                  <td
                    class="align-middle talent-text-muted hide_content"
                    id="employer_date_joined2"
                  >
                  ${data.createdAt.split("T")[0]}
                  </td>
                  <td class="align-middle">
                    <button class="btn talent-btn-dark" id="employer_verified">
                      ${data.verification_status}
                    </button>
                  </td>
                  <td class="align-middle">
                    <button class="btn l-padding r-padding">
                      <svg
                        width="4"
                        height="14"
                        viewBox="0 0 4 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="2" cy="12" r="2" fill="#353A45" />
                        <circle cx="2" cy="12" r="2" fill="#353A45" />
                        <circle cx="2" cy="12" r="2" fill="#353A45" />
                        <circle cx="2" cy="7" r="2" fill="#353A45" />
                        <circle cx="2" cy="7" r="2" fill="#353A45" />
                        <circle cx="2" cy="7" r="2" fill="#353A45" />
                        <circle cx="2" cy="2" r="2" fill="#353A45" />
                        <circle cx="2" cy="2" r="2" fill="#353A45" />
                        <circle cx="2" cy="2" r="2" fill="#353A45" />
                      </svg>
                    </button>
                  </td>
                </tr>
        `;
      });
      $("#individuals_count").html(individuals_array.length)
      $("#company_count").html(company_array.length)
    })
    .catch((err) => {
      console.log(err)
      throw new Error(err)
    });
});
