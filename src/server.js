'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3050;
const express = require("express");
const app = express();

const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");

const signinRouter=require("./routes/signin");
const signupRouter=require("./routes/signup");
const getUsersRouter=require("./routes/gitUsers");
const v2Router=require("./routes/v2");

app.use(express.json());
app.use(signinRouter);
app.use(signupRouter);
app.use(getUsersRouter);

app.get('/ynwa', (req, res)=>{
    res.send('Welcome---------');
})

app.use('/v2',v2Router);

app.use("*", notFoundHandler);
app.use(errorHandler); 

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};