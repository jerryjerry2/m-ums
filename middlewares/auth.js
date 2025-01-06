const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwtToken;
    console.log('Token in middleware', token);
    if(token){
        jwt.verify(token, 'ant secret', (err, decodedToken) => {
            if(err){
                res.redirect('/signin')
            }else{
                next();
            } 
        });
    }else{
        console.log('Is not logged in');
        res.redirect('/signin');
    }
}


module.exports = {
    requireAuth
}