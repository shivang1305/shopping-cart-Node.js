const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Account Page
router.get('/account', (req, res) => res.render('account', {
    style: 'account.css',
    title: 'Register'
}));

//Login Page
router.get('/login', (req, res) => res.render('login', {
    style: 'account.css',
    title: 'Login'
}));

//Register Page
router.get('/register', (req, res) => res.render('register', {
    style: 'account.css',
    title: 'Signup'
}));

//Register Handle
router.post('/register', (req, res)=>{
    const { name,email,password,password2 } = req.body;
    let errors = [];

    //Check Required Feilds
    if(!name || !email || !password || !password2)
        errors.push({msg:'Please enter all the required feilds'});
    else{
        //Check passwords match
        if(password !== password2)
        errors.push({msg:'Passwords do not match'});

        //Check Password Length
        if(password.length<6)
          errors.push({msg:'Password is less than 6 characters'});
    }

    if(errors.length>0)
    {
        res.render('register',{
        errors,
        name,
        email,
        password,
        password2
        });
    }
    else
    {
        //Validation passed
        User.findOne({email : email})
            .then(user =>{
                if(user)
                {
                    //User already exists
                    errors.push({msg : 'This Email is already registered '});
                    res.render('register',{
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
                else
                {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    //Hash password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) =>{
                            if(err) throw err;
                            //Set password to hashed
                            newUser.password = hash 
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered & can Log In');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log("Error in saving the data: "+err));
                    }));
                }
    })
    .catch((err) => { console.log(err )});
    }
});

//Checking the authentication from the user
const checkAuthenticatied = function(req, res, next){
    if(req.isAuthenticated())
        return next();
    else
        res.redirect('/users/login');
}

//Dashboard Handle
// router.get('/dashboard', checkAuthenticatied, (req, res) => {
// });

//Login Handle
router.post('/login', (req,res,next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
        login: true
    })(req, res, next);
});

//Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out successfully');
    res.redirect('/users/login');
})


module.exports = router;