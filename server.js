const express = require('express');
const app = express();
const logger = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// app.use('/uploads', express.static('uploads'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

app.use('/api/admin', require('./routes/admin'));

const users = require('./routes/user');
users(app);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}....`);
});