

const router = require('express').Router();
const { Post, User, Comment } = require('../models');


router.post('/', async (req, res)=> {

    try{

        const result = await Post.create({

            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id

        });

        const user = req.session.user;



        // res.render('homepage.handlebars', {
        //     user: user
        // })

        res.redirect('/');

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }


});




router.post('/edit/:id', async (req, res)=> {
    console.log("edit", req.params.id)

    try {

        const newPost = await Post.update({

            title: req.body.title,
            body: req.body.body,


        },{
            where: {id: req.params.id}
        });

        res.redirect("/dashboard")


    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

});



router.get('/delete/:id', async (req, res)=> {
    console.log("delete", req.params.id)

    try {

        const result = await Post.destroy({
            where: {id: req.params.id},
            raw: true
        });

        res.redirect("/dashboard")


    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

});


router.post('/:post_id/comment/', async (req, res)=> {


    const user = req.session.user;

    console.log("add comment", {

        text: req.body.body,
        post_id: parseInt(req.params.post_id),
        user_id: parseInt( user.id)

    })

    try{

        const result = await Comment.create({

            text: req.body.body,
            post_id: parseInt(req.params.post_id),
            user_id: parseInt( user.id)

        });

        console.log("comment", result)

        res.redirect(`/post/${req.params.post_id}/comment`);

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }


});


module.exports = router;