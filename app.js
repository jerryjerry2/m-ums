const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const employeeRoute = require('./routes/employee');

const app = express();
app.set('view engine', 'ejs');

//app.use(morgan('dev'));
// middlware upload file
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(authRoute);
app.use(employeeRoute);

app.listen(3000);