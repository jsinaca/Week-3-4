const app = require('express')();
const dotenv = require('dotenv').config();
const mongodb = require('./source/db/');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 8083;
const host = process.env.HOST;

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type, Accept, Z-Key'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST, DELETE, OPTIONS');
    next();
})
// app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
// app.use(cors({ origin: '*'}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GUTHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
            
app.use('/', require('./source/routers'));

mongodb.initDB((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`App listening on ${host}:${port}`)
        })
    }
})