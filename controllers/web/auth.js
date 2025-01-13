const signupGet = (req, res) => {
    res.render('auth/signup');
};

const signinGet = (req, res) => {
    res.render('auth/signin');
};

module.exports = {
    signupGet,
    signinGet,
}

