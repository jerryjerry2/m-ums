const express = require('express');
const fileUpload = require('express-fileupload');
const userRoute = require('./routes/user');

const app = express();
app.set('view engine', 'ejs');

//app.use(morgan('dev'));
// middlware upload file
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(userRoute);

app.listen(3000);