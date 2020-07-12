module.exports = {
    passwordOTP: (req, res) => {
        res.render('Pages/password/password-otp', {pageName: 'Password OTP'})
    },

    passwordReset: (req, res) => {
        res.render('Pages/password/password-reset', {pageName: 'Password Reset'})
    },

    passwordSuccess: (req, res) => {
        res.render('Pages/password/password-success', {pageName: 'Password Success'})
    },

    recoverPassword: (req, res) => {
        res.render('Pages/password/recover_password', { pageName: 'Recover Password' });
    },

    updatePassword: (req, res) => {
        res.render('Pages/password/password-update', {pageName: 'Update Password'});
    }
}