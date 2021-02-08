const connection = require('../connection');
const myqsl = require('mysql');
const response = require('../res');

exports.login = (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    }

    if (data.username && data.password) {
        let query = 'SELECT * FROM ?? WHERE ?? = ? ';
        let table = ['users', 'username', data.username];

        query = myqsl.format(query, table);
        connection.query(query, (error, values) => {
            if (error) {
                console.log(error);
                return response.failed(error, 500, res);
            } else {
                if (values.length > 0) {
                    query += `AND password = '${data.password}'`;

                    connection.query(query, (error, values) => {
                        if (error) {
                            console.log(error);
                            return response.failed(error, 500, res);
                        } else {
                            if (values.length > 0) {
                                const id = {
                                    id_user: values[0].id_user,
                                    id_role: values[0].id_role
                                }

                                response.ok('Login Succesfully', res, id);
                            } else {
                                return response.failed('Username atau password anda salah!', 401, res);
                            }
                        }
                    });
                }
            }
        });
    } else {
        return response.failed('Bad Request!', 400, res);
    }
}

// exports.register = (req, res) => {
//     const data = {
//         nama: req.body.fullname,
//         username: req.body.username,
//         password: md5(req.body.password),
//         alamat: req.body.alamat,
//         created_at: moment().format('YYYY-MM-DD')
//     }

//     let query = 'SELECT * FROM ?? WHERE ?? = ?';
//     const table = ['users', data.username];

//     query = myqsl.format(query, table);
//     connection.query(query, data, (error, values) => {
//         if (error) {
//             console.log(error);
//             return response.failed('Bad Request!', 400, res);
//         } else {
//             if (values.length === 0) {
//                 let query = 'INSERT INTO ?? SET ?';
//                 const table = ['users'];

//                 query = myqsl.format(query, table);
//                 connection.query(query, data, (error) => {
//                     if (error) {
//                         console.log(error);
//                         return response.failed('Bad Request!', 400, res);
//                     } else {
//                         response.ok('Berhasil registrasi user!', res);
//                     }
//                 });
//             } else {
//                 return response.failed('Username sudah ada di database!', 403, res);
//             }
//         }
//     });
// }