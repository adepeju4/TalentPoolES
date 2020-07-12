module.exports = {
    adminSignUp: (req, res) => {
        res.render('Pages/admin-signup', {pageName: 'Admin SignUp'})
    },

    adminLogin: (req, res) => {
        res.render('Pages/admin-login', {pageName: 'Admin Login'})
    }
}