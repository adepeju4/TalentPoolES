module.exports = {
  adminSignUp: (req, res) => {
    res.render('Pages/admin-signup', { pageName: 'Admin SignUp' });
  },

  // adminLogin: (req, res) => {
  //   res.render('Pages/admin-login', { pageName: 'Admin Login' });
  // },

  adminLogin: (req, res) => {
    if (req.session.isLoggedIn) {
      res.redirect('/admin-dashboard');
    }

    let message = req.flash('error');
    if (message.length > 0) {
      [message] = message;
    } else {
      message = null;
    }
    res.render('Pages/admin-login', {
      path: '/admin-login',
      pageName: 'Admin Login',
      errorMessage: message,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },
};
