const con = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, 'ant secret', {expiresIn : 3 * 24 * 60 * 60});
}

const signupGet = (req, res) => {
    res.render('auth/signup');
};

const signupPost = async (req, res) => {
    console.log(req.body);
    let salt = await bcrypt.genSalt();
    let hashPassword = await bcrypt.hash(req.body.password, 2);

    console.log(hashPassword);

    let body = req.body;
    let sql = "INSERT INTO `user`( `name`, `email`, `password`) VALUES (?, ?, ?)";
    let myarr = ['', body.email, hashPassword];
    con.query(sql, myarr, (err, data) => {
        if(err){
            console.log(err);
        }

        console.log('Inserted');
    })

};

const signinGet = (req, res) => {
    res.render('auth/signin');
};

const signinPost = (req, res) => {
    //console.log(req.body);
    let body = req.body;
    con.query('select * from user where email = ?', body.email, async (err, data) => {
        if(err){
            console.log(err);
        }

        if(data.length == 0){
            res.send('Invalid Email');
        }

        let decrypedPassword = await bcrypt.compare(body.password, data[0].password);
        //console.log(decrypedPassword);

        if(decrypedPassword){
            const token = generateToken(data[0].id);
            //console.log(token);
            res.cookie('jwtToken', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
            res.redirect('/');
        }else{
            res.send('Invalid Password');
        }
    })
};

const logout = (req, res) => {
    res.cookie('jwtToken', '', {maxAge : 1});
    res.redirect('/signin');
};

module.exports = {
    signupGet,
    signupPost,
    signinGet,
    signinPost,
    logout
}

