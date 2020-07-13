module.exports = {
  // employerSignIn: (req, res) => {
  //   res.render('Pages/employer-signin', { pageName: 'Employer Login' });
  // },

  employerSignup: (req, res) => {
    res.render('Pages/employer-sign-up', {
      pageName: 'Employer Signup',
    });
  },
  employerSignIn: (req, res) => {
    if (req.session.isLoggedIn) {
      res.redirect('/employee-dashboard');
    }

    let message = req.flash('error');
    if (message.length > 0) {
      [message] = message;
    } else {
      message = null;
    }
    res.render('Pages/employer-signin', {
      path: '/employee-sign-in',
      pageName: 'Employer Login',
      errorMessage: message,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },
};
