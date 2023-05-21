const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const withAuth = require("../utils/auth");




router.get('/dashboard', async (req, res)=>{

    const user = req.session.user;
    console.log("what is user dashboard?", user)
    if(!user || user === undefined){
        res.redirect("/login")
    }

    const result = await Post.findAll({
        where: {user_id: user.id},
        include: {model: User}
    });

    const plainBuild = result.map(x => x.get({plain: true}))

    console.log("??",plainBuild)

    try{
        console.log("homepage loaded")
        res.render('dashboard.handlebars', {
            user: user,
            posts: plainBuild
        })
    } catch(err){
        console.log(err)
    }
})



router.get('/signup', async (req, res)=>{
    try{
   
        res.render('signup', {})
    } catch(err){
      console.log(err)
    }
  })


  router.get('/login', async (req, res)=>{
    try{
        res.render('login', {})
    } catch(err){
      console.log(err)
    }
  })

router.get('/logout', async (req, res) => {
    console.log("logging out")
    req.session.destroy(() => {
        res.redirect('/');
    });

})

router.get('/post/edit/:id', async (req, res)=> {

    const user = req.session.user;
    console.log("what is user in edit?", user)
    if(!user || user === undefined){
        res.redirect("/login")
    }


    try {

        const result = await Post.findOne({
            where: {id: req.params.id},
            include: [{model: User}, {model: Comment, include: {model: User}}]

        });
        const plainBuild = result.get({plain: true})



        res.render("editpost", {
            post: plainBuild
        })


    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

});

router.get('/post/:id/comment/', withAuth, async (req, res)=> {

    const user = req.session.user;
    console.log("add comment user?", user)
    if(!user || user === undefined){
        res.redirect("/login")
    }


    try {

        const result = await Post.findOne({
            where: {id: req.params.id},
            include: [{model: User}, {model: Comment, include: {model: User}}]

        });
        const plainBuild = result.get({plain: true})

        res.render("addcomment", {
            post: plainBuild,
            user: user
        })


    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

});

router.get('/', async (req, res)=>{






    let user = req.session.user;

    if(user === undefined && req.query.id  !== undefined){
        user = await User.findOne({
            where: { id: req.query.id },
            raw: true
        });
    }



    const result = await Post.findAll({
        include: {model: User}
    });

    const plainBuild = result.map(x => x.get({plain: true}))




    try{
        console.log("homepage loaded", user)
        res.render('homepage.handlebars', {
            user: user,
            posts:  plainBuild
        })
    } catch(err){
        console.log(err)
    }
})


module.exports = router;