const con = require('../config/db');
const fs = require('fs');

const getAllUser = async(req, res) => {
    con.query('select * from users', (err, data) => {
        if(err){
            console.log(err);
        }
        
        console.log(data);
        res.render('index', {users : data});
    });
}

const getAbout = (req, res) => {
    res.render('about');
}

const getCreateUser = (req, res) => {
    res.render('create');
}

const postCreateUser = (req, res) => {
    console.log(req.files);
    let sampleFile = req.files.avarta;
    let sampleFileName = Date.now() + sampleFile.name;
    let uploadPath = './public/upload/' + sampleFileName;

    sampleFile.mv(uploadPath, (err) =>{
        if(err){
            console.log(err);
        }
        console.log('Success');
    });

    let sql = "INSERT INTO `users`(`fullname`, `email`, `age`,  `avarta`) VALUES (?, ?, ?, ? )";
    let arrData = [req.body.name, req.body.email, req.body.age, sampleFileName];
    con.query(sql, arrData, (err, data) => {
        if(err){
            console.log(err);
        }

        res.redirect('/');
    });
}

const deleteUser = (req, res) => {
    console.log('route delete');
    console.log(req.params);
    con.query('DELETE FROM `users` WHERE id = ?', req.params.id, (err, data) => {
        if(err){
            console.log(err);
        }

        res.redirect('/');
    })
}

const getEditUser = (req, res) => {
    console.log(req.params);
    con.query('select * from users where id = ?', req.params.id, (err, data) => {
        if(err){
            console.log(err);
        }

        console.log(data);
        res.render('edit', {result : data});
    });
}

const postEditUser = (req, res) => {
    let body = req.body;

    let file;
    if(!req.files){
        file = body.old_img;
    }else{
        let sampleFile = req.files.avarta;
        let sampleFileName = Date.now() + sampleFile.name;
        let uploadPath = './public/upload/' + sampleFileName;
    
        sampleFile.mv(uploadPath, (err) =>{
            if(err){
                console.log(err);
            }
            
            fs.unlinkSync('./public/upload/' + body.old_img);
        });    
        file = sampleFileName;
    }

    let sql = "UPDATE `users` SET `fullname`= ?,`email`=?,`age`=?,`avarta`=?  WHERE id = ?";
    let myarr = [body.name, body.email, body.age, file, body.id];
    con.query(sql, myarr, (err, data) => {
        if(err){
            console.log(err);
        }

        res.redirect('/');
    })
};


module.exports = {
    getAllUser,
    getAbout,
    getCreateUser,
    postCreateUser,
    deleteUser,
    getEditUser,
    postEditUser
}