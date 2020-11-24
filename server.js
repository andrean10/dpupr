const express = require('express');
const app = express();
const logger = require('morgan');
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json);
app.use(logger('dev'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});