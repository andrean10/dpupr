const mysql = require('mysql');
const response = require('../res');
const connection = require('../connection');
const fs = require('fs');
const path = require('path');

exports.index = (req, res) => {
    let query = 'SELECT * FROM ??';
    const table = ['admin'];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
        } else {
            response.ok(values, res);
        }
    });
}

exports.program = (req, res) => {
    let query = 'SELECT * FROM ??';
    const table = ['program'];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed("Bad Request!", 400, res);
        } else {
            if (values.length > 0) {
                response.ok(values, res);
            } else {
                response.ok('Data tidak ada!', res);
            }
        }
    });
}

exports.programById = (req, res) => {
    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['program', 'id_program', req.params.id];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed("Bad Request!", 400, res);
        } else {
            if (values.length > 0) {
                response.ok(values, res);
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.addProgram = (req, res) => {
    const data = {
        nama_program: req.body.nama_program
    }

    let query = 'INSERT INTO ?? SET ?';
    const table = ['program'];

    query = mysql.format(query, table);
    connection.query(query, data, (error) => {
        if (error) {
            console.log(error);
            return response.failed("Bad Request!", 400, res);
        } else {
            response.ok("Berhasil menambahkan program baru!", res);
        }
    });
}

exports.editProgram = (req, res) => {
    const data = {
        id_program: req.params.id,
        nama_program: req.body.nama_program
    }

    let query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    const table = ['program', 'nama_program', data.nama_program, 'id_program', data.id_program];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed("Bad Request!", 400, res);
        } else {
            if (values.changedRows > 0) {
                response.ok("Data program berhasil diubah!", res);
            } else {
                return response.ok("Tidak ada perubahan pada data program!", res);
            }
        }
    });
}

exports.deleteProgram = (req, res) => {
    let query = 'DELETE FROM ?? WHERE ?? = ?';
    const table = ['program', 'id_program', req.params.id];

    query = mysql.format(query, table);
    connection.query(query, (error) => {
        if (error) {
            console.log(error);
            return response.failed("Bad Request!", 400, res);
        } else {
            response.ok("Data berhasil dihapus!", res);
        }
    });
}

// kegiatan
exports.showKegiatan = (req, res) => {
    let query = 'SELECT * FROM ??';
    const table = ['kegiatan'];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                response.ok(values, res);
            } else {
                response.ok('Data tidak ada!', res);
            }
        }
    });
}

exports.showKegiatanById = (req, res) => {
    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['kegiatan', 'id_kegiatan', req.params.id];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                response.ok(values, res);
            } else {
                response.ok('Data tidak ada!', res);
            }
        }
    });
}

exports.addKegiatan = (req, res) => {
    const data = {
        nama_kegiatan: req.body.nama_kegiatan,
        id_program: req.body.id_program
    }

    let query = 'INSERT INTO ?? SET ?';
    const table = ['kegiatan'];

    query = mysql.format(query, table);
    connection.query(query, data, (error) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            response.ok('Berhasil menambahkan kegiatan baru!', res);
        }
    });
}

exports.editKegiatan = (req, res) => {
    const data = {
        nama_kegiatan: req.body.nama_kegiatan,
        id_program: req.body.id_program
    }

    // check data if exists delete data
    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['kegiatan', 'id_kegiatan', req.params.id];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed("Bad Request!", 400, res);
        } else {
            if (values.length > 0) {
                let query = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
                const table = ['kegiatan', 'nama_kegiatan', data.nama_kegiatan, 'id_program', data.id_program, 'id_kegiatan', req.params.id];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.changedRows > 0) {
                            response.ok("Data kegiatan berhasil diubah!", res);
                        } else {
                            return response.ok("Tidak ada perubahan pada data kegiatan!", res);
                        }
                    }
                });
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    }); 
}

exports.deleteKegiatan = (req, res) => {
    // check data if exists delete data
    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['kegiatan', 'id_kegiatan', req.params.id];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed("Bad Request!", 400, res);
        } else {
            if (values.length > 0) {
                let query = 'DELETE FROM ?? WHERE ?? = ?';
                const table = ['kegiatan', 'id_kegiatan', req.params.id];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed("Bad Request!", 400, res);
                    } else {
                        if (values.affectedRows) {
                            response.ok("Data kegiatan berhasil dihapus!", res);
                        } else {
                            response.failed('Data gagal dihapus!', 403, res);
                        }
                    }
                });
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}