module.exports = {
  employerSignIn : (req, res) => {
    res.render('employer-signin', {pageName: 'Employer Login'})
  },

  employerSignup: (req, res) => {
    res.render('Pages/employer-sign-up', {
      pageName: 'Employer Signup'
  });
  }
};
