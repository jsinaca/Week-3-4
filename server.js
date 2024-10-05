const app = require('express')();
const dotenv = require('dotenv').config();
const mongodb = require('./source/db/');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8083;
const host = process.env.HOST;

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type, Accept, Z-Key'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST, DELETE, OPTIONS');
    next();
})
app.use('/', require('./source/routers'))

mongodb.initDB((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`App listening on ${host}:${port}`)
        })
    }
})