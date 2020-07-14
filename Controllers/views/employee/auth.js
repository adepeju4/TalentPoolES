module.exports = {
  employeeSignup: (req, res) => {
    res.render('Pages/employee-sign-up', {
      path: '/employee/register',
      pageName: 'Employee Signup',
      error: req.flash('error'),
      errors: req.flash('errors'),
      success: req.flash('success'),
    });
  },

  employeeSignIn: (req, res) => {
    if (req.session.isLoggedIn) {
      res.redirect('/employee/dashboard');
    }

    let message = req.flash('error');
    if (message.length > 0) {
      [message] = message;
    } else {
      message = null;
    }
    res.render('Pages/employee-sign-in', {
      path: '/employee/login',
      pageName: 'Employee Login',
      errorMessage: message,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },
};
