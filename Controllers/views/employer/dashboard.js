module.exports = {
  employerDashboard: (req, res) => {
    res.render('Pages/employer-dashboard', {
      pageName: 'Employer Dashboard'
    });
  },

  employerProfile: (req, res) => {
    res.render('Pages/employer-profile-page', {
      pageName: 'Profile'
    });
  },

  employerMessages: (req, res) => {
    /*//get messages from db
    const url = 'https://api.lancers.app/v1/message/chat-users';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJpbGxtYWwwNzFAZ21haWwuY29tIiwidXNlcklkIjoiYWE2MjRkMGYtYjgzZi00MzQ3LWIwZjAtYWQxY2Q4NTJhNzU2IiwidXNlclJvbGUiOiJST0wtRU1QTE9ZRVIiLCJ1c2VyVHlwZUlkIjpudWxsLCJpYXQiOjE1OTQyMDgxNjQsImV4cCI6MTU5NDI5NDU2NH0.tuwAyP1Zii-5JyUeqt4Qrby7V4MbYjSr4ZSCvG-FoQc';
    const allMessages = axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))*/

    res.render('Pages/employer-messages', {
      pageName: 'Employer Messages'
    });

    /*get cookies
function logCookie(cookie) {
  if (cookie) {
    console.log(cookie.value);
  }
}

function getCookie(tabs) {
  var getting = browser.cookies.get({
    url: tabs[0].url,
    name: "favourite-colour"
  });
  getting.then(logCookie);
}

var getActive = browser.tabs.query({
  active: true,
  currentWindow: true
});
getActive.then(getCookie);*/
      
  },

  employerCreateProfile: (req, res) => {
    res.render('Pages/employer-profile-creation', {
      pageName: 'Create Profile'
    });
  },

  employerType: (req, res) => {
    res.render('Pages/employer-type', { pageName: 'Profile Type'});
  },

  employerCompany: (req, res) => {
    res.render('Pages/employer-company', { pageName: 'Company Profile'});
  },

  employerIndividual: (req, res) => {
    res.render('Pages/employer-individual', { pageName: 'Individual Profile'});
  },

  employerDashboardSettings: (req, res) => {
    res.render('Pages/employer-dash-settings.ejs', {
      pageName: 'Employer Dashboard - Settings',
    });
  },

  employerDashboardSupport: (req, res) => {
    res.render('Pages/employer-dash-support', {
      pageName: 'Employer Dashboard'
    });
  },

  employerEmployeeGallery: (req, res) => {
    res.render('Pages/employer-employees-gallery', {
      pageName: 'Employee Gallery'
    });
  },

  employerAddTeam: (req, res) => {
    res.render('Pages/employer-add-a-team', {
      pageName: 'Employer - Add Team'
    });
  },

  employerCompanyDashboard: (req, res) => {
    res.render('Pages/employer-company-dashboard', {
      pageName: 'Employer Dashboard'
    });
  },

  employerIndividualCreateProfile: (req, res) => {
    res.render('Pages/employer-indiv', {
      pageName: 'Create Profile'
    });
  },

  employerCertificate: (req, res) => {
    res.render('Pages/employer-certificate', { pageName: 'Upload Certificate' });
  },
}
