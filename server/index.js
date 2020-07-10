
require('dotenv').config();

const express = require('express'),
massive = require('massive'),
session = require('express-session'),
ctrl = require('../server/controller'),
{SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
port = SERVER_PORT,
app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db =>{
    app.set('db', db)
    console.log('Dis DB connected all night long')
})

//auth endpoints
app.post('/api/register', ctrl.register);
app.post('/api/login', ctrl.login);
app.get('/api/logout', ctrl.logout)

app.listen(port, ()=>console.log(`Let's make sweet music together on port ${port}fm`))