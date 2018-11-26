const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

const config = {
    user: 'demboscki',
    password: 'Pj260581',
    server: 'devsrvdemboscki.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'DevDbDemboscki',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

sql.connect(config).catch(err => debug(err));


// app.use(morgan('combined'));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));
require('./src/config/passport.js')(app);

// exemplo de middleware
app.use((req, res, next) => {
    debug('my middleware');
    next();
});

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', 'src/views');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

const nav = [
    { link: '/books', title: 'Book' },
    { link: '/authors', title: 'Author' }];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    // res.send('Hello from my library app');
    // res.sendFile(path.join(__dirname, 'views/index.html'));
    // res.render('index');
    res.render(
        'index',
        {
            nav: [
                { link: '/books', title: 'Books' },
                { link: '/authors', title: 'Authors' }],
            title: 'Library'
        }
    );
});

// run as: $env:DEBUG='app';node app.js
app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
});
