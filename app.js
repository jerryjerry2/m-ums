const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middlewares/auth');
//Api
const apiAuth = require('./routes/api/auth');
//Web
const webAuth = require('./routes/web/auth');
const employeeRoute = require('./routes/employee');

const app = express();
app.set('view engine', 'ejs');

//app.use(morgan('dev'));
// middlware upload file
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('*', checkUser);

//Api
app.use(apiAuth);

//Web
app.use(webAuth);

app.use(employeeRoute);

app.listen(3000);