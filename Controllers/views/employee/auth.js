module.exports = {
  employeeSignIn: (req, res) => {
      res.render('Pages/employee-sign-in', { pageName: 'Employee Sign In' });
    },
    
    employeeSignup: (req, res) => {
      res.render('Pages/employee-sign-up', { pageName: 'Sign Up'});
    }
}

