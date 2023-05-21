const express = require('express');
const router = express.Router();

const bcrypt = require("bcrypt");
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res)=>{
   
  try{
        const result = await User.findAll({})


     
        console.log(result)
        res.json(result)
  } catch(err){
    console.log(err)
  }
})

router.post('/login', async (req, res) => {
    console.log("did i get login data?", req.body)
    try {
        const { username, password } = req.body;

        // gind the user by username
        const user = await User.findOne({
            where: { username },
            raw: true
        });


        if (!user ) {
            return res.status(400).json({ message: 'Invalid username'});
        }



        // if the user is not found, send an error msg
        console.log("comparing", password, user.password)

        bcrypt.compare(password, user.password, async function(err, result) {
            // result == true

            if(result){
                req.session.user = await user;
                console.log("login success", user, req.session.user);

                    res.redirect(`/?id=${user.id}`)

                // send success msg

            } else {
                return res.status(400).json({ message: 'Invalid username or password'});
            }
        });



    }   catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/signup', async (req, res) => {
    console.log("did i get data?", req.body);
    try {

        // find the user by username
        const user = await User.create({
            username: req.body.username,
            password: req.body.password
        });


        // set user ID in the session
        console.log("catch", req.session,user)
        req.session.user = user;

        // send success msg
        //res.status(200).json({ message: 'Signup successful!' });
        res.redirect('/');

    }   catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }

});




module.exports = router;