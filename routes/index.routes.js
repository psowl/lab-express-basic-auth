const express = require('express');
const router = express.Router();
const bcryptjs = require ('bcryptjs');
const User = require('../models/User.model'); 
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

    User.create({
        username: req.body.username, 
        password: hash
    }).then(userfromDB => {
        res.send('user created')
    }). catch(err => {
        next(err)
    })
})

router.get('/login', (req, res, next) => {
    if(req.session.user) {
        res.redirect('/profile')
    }
    res.render('login')
})


router.post('/login', (req, res, next) => {
    const {username, password} = req.body
  
    
    if (!username || !password) {
      res.render('auth/login', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return; 
    }
  
    User.findOne({username: username})
      .then(user => {
        if (!user) {
          res.render('/login', {errorMessage: 'Incorrect username/password'})
          return; 
        }
  

        if (bcryptjs.compareSync(password, user.password)) {
          console.log('user ok', user)
  
          req.session.user = user
  
          res.send('logged!')
        } else {
          res.render('/login', {errorMessage: 'Incorrect username/password'})
        }
      })
      .catch(err => {
        next(err)
      })
  
  })

  router.get('/profile', (req, res, next) => {
    if (!req.session.user) {
      res.redirect('/login')
    }
    
    res.render('users/userProfile', {
      user: req.session.user
    })
  })

module.exports = router;
