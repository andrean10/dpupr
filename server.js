const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const logger = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(logger('dev'));
app.use(fileUpload());

// authx
app.use('/api', require('./routes/auth'));

// admin
const admin = require('./routes/admin');
admin(app)

// pegawai
const users = require('./routes/user');
users(app);

// error handlers url
app.use((req, res, next) => {
    const err = new Error('Not Found!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}....`);
});