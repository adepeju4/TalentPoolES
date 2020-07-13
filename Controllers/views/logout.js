const axios = require('axios');

exports.logout = async (request, response) => {
  let status = 'unsuccessful';
  let message;
  try {
    const { data } = await axios.get('/v1/auth/logout');
    status = data.status;
    message = data.data;
    console.log(data.data);
  } catch (e) {
    message = 'Logout unsuccessful';
    console.log(`error occured ${e}`);
  }

  response.render('Pages/logout', {
    pageName: 'Logging Out',
    status: status,
    logoutMessage: message,
  });
};
