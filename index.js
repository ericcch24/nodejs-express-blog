const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 5001;


const adminController = require('./controllers/admin');
const blogController = require('./controllers/blog')


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/css'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(flash());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next();
})

function redirectBack(req, res) {
  res.redirect('back')
}

app.get('/', blogController.index);

app.get('/login', adminController.login);
app.post('/login', adminController.handleLogin, redirectBack);
app.get('/logout', adminController.logout);
app.get('/admin', adminController.admin);

app.get('/post-article', blogController.post);
app.post('/post-article', blogController.handlePost);
app.get('/update-article/:id', blogController.update);
app.post('/update-article/:id', blogController.handleUpdate)
app.get('/delete-article/:id', blogController.delete)

app.get('/blog/:id', blogController.single)
app.get('/list', blogController.list)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});