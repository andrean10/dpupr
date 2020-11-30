const routerAdmin = require('./admin');
const routerUser = require('./user');
const express = require('express');
const route = express.Router();

// module.exports = routerAdmin(route);
// module.exports = routerUser(route);

// module.exports = route.get('/', (req, res) => {
//     res.send("Halaman Admin");
// });