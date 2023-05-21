const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');

const homeRoutes = require('./controller/homeRoutes');
const userRoutes = require('./controller/userRoutes');
const postRoutes = require('./controller/postRoutes');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({

})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    secure: false,
    sameSite: 'strict',
  },
  resave: true,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
};




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sess));

// added the postRoutes to the app

//app.use('/api/post',postRoutes);
app.use('/', homeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);



app.listen(PORT, ()=> {

  console.log(`app listening on http://localhost:${PORT}`)
  sequelize.sync({ force: false })

});



