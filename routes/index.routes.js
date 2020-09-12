const express = require('express');
const router = express.Router();
const bcryptjs = require ('bcryptjs');
const user = require('../models/User.model'); 
const salt = bcryptjs.genSaltSync(10);

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

router.get('/auth-routes', (req, res, next) => {
    res.render('auth-routes')
})

router.post('/auth-routes', (req, res, next) => {
    const plainPassword = req.body.password;
    const hash = bcryptjs.hashSync(plainPassword, salt);
    console.log('hash pswd', hash)

    user.create({
        username: req.body.username, 
        password: hash
    }).then(userfromDB => {
        res.send('user created')
    }). catch(err => {
        next(err)
    })
})

module.exports = router;
