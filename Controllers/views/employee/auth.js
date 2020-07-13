module.exports = {
  employeeSignup: (req, res) => {
    res.render('Pages/employee-sign-up', {
      pageName: 'Employee Signup', error: req.flash('error'), errors: req.flash('errors'), success: req.flash('success'),
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
      path: '/employee-sign-in',
      pageName: 'Employee Sign In',
      errorMessage: message,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },
};
