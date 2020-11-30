// const response = require('../res');
const connection = require('../connection');
const myqsl = require('mysql');
const response = require('../res');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

// Pekerjaan
exports.showPekerjaan = (req, res) => {
    response.paging({
        'status': 200,
        'page_counts': res.paginatedResults.length,
        'values': res.paginatedResults
    }, res);
}

exports.showPekerjaanById = (req, res, next) => {
    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['pekerjaan', 'id_pekerjaan', req.params.id];

    query = myqsl.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                response.ok(values, res);
            } else {
                response.ok('Data tidak ada', res);
            }
        }
    });
}

exports.addPekerjaan = (req, res) => {
    const data = {
        tanggal_pekerjaan: req.body.tanggal_pekerjaan,
        nama_pekerjaan: req.body.nama_pekerjaan,
        id_kecamatan: req.body.id_kecamatan,
        id_kelurahanataudesa: req.body.id_kelurahanataudesa,
        id_kegiatan: req.body.id_kegiatan,
        created_at: moment().format('YYYY-MM-DD')
    }

    let query = 'INSERT INTO ?? SET ?';
    const table = ['pekerjaan'];

    query = myqsl.format(query, table);
    connection.query(query, data, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            response.paging({
                code: 200,
                insertId: values.insertId,
                message: 'Data berhasil ditambahkan!'
            }, res);
        }
    });
}

exports.editPekerjaan = (req, res) => {
    const id = req.params.id;
    const data = {
        tanggal_pekerjaan: req.body.tanggal_pekerjaan,
        nama_pekerjaan: req.body.nama_pekerjaan,
        id_kecamatan: req.body.id_kecamatan,
        id_kelurahanataudesa: req.body.id_kelurahanataudesa,
        id_kegiatan: req.body.id_kegiatan,
        surat: req.file,
        berkas: req.file,
        berkas2: req.file,
        berkas3: req.file,
        berkas4: req.keteranganberkas3,
        berkas5: req.file,
        berkas6: req.file,
        berkas7: req.file,
        berkas8: req.file,
        berkas9: req.file,
        berkas10: req.file,
        berkas11: req.file,
        berkas12: req.file,
        berkas13: req.file,
        berkas14: req.file,
        berkas15: req.file,
        berkas16: req.file,
        berkas17: req.file,
        berkas18: req.file,
        berkas19: req.file,
        berkas20: req.file,
        berkas_pdf: req.file,
        keterangansurat: req.body.keterangansurat,
        keteranganberkas: req.body.keteranganberkas,
        keteranganberkas2: req.body.keteranganberkas2,
        keteranganberkas3: req.body.keteranganberkas3,
        keteranganberkas4: req.body.keteranganberkas4,
        keteranganberkas5: req.body.keteranganberkas5,
        keteranganberkas6: req.body.keteranganberkas6,
        keteranganberkas7: req.body.keteranganberkas7,
        keteranganberkas8: req.body.keteranganberkas8,
        keteranganberkas9: req.body.keteranganberkas9,
        keteranganberkas10: req.body.keteranganberkas10,
        keteranganberkas11: req.body.keteranganberkas11,
        keteranganberkas12: req.body.keteranganberkas12,
        keteranganberkas13: req.body.keteranganberkas13,
        keteranganberkas14: req.body.keteranganberkas14,
        keteranganberkas15: req.body.keteranganberkas15,
        keteranganberkas16: req.body.keteranganberkas16,
        keteranganberkas17: req.body.keteranganberkas17,
        keteranganberkas18: req.body.keteranganberkas18,
        keteranganberkas19: req.body.keteranganberkas19,
        keteranganberkas20: req.body.keteranganberkas20,
        keteranganberkas_pdf: req.body.keteranganberkas_pdf,
        dokumentasi: req.file,
        dokumentasi2: req.file,
        dokumentasi3: req.file,
        dokumentasi4: req.file,
        dokumentasi5: req.file,
        dokumentasi6: req.file,
        dokumentasi7: req.file,
        dokumentasi8: req.file,
        dokumentasi9: req.file,
        dokumentasi10: req.file,
        keterangandokumentasi: req.body.keterangandokumentasi,
        keterangandokumentasi2: req.body.keterangandokumentasi2,
        keterangandokumentasi3: req.body.keterangandokumentasi3,
        keterangandokumentasi4: req.body.keterangandokumentasi4,
        keterangandokumentasi5: req.body.keterangandokumentasi5,
        keterangandokumentasi6: req.body.keterangandokumentasi6,
        keterangandokumentasi7: req.body.keterangandokumentasi7,
        keterangandokumentasi8: req.body.keterangandokumentasi8,
        keterangandokumentasi9: req.body.keterangandokumentasi9,
        keterangandokumentasi10: req.body.keterangandokumentasi10,
        updated_at: moment().format('YYYY-MM-DD')
    }

    console.log(data.updated_at);

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['pekerjaan', 'id_pekerjaan', req.params.id];

    query = myqsl.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                let query;
                if (data.tanggal_pekerjaan && data.nama_pekerjaan && data.id_kecamatan && data.id_kelurahanataudesa && data.id_kegiatan, data.updated_at) {
                    query = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
                    const table = ['pekerjaan', 'tanggal_pekerjaan', data.tanggal_pekerjaan, 'nama_pekerjaan', data.nama_pekerjaan, 'id_kecamatan', data.id_kecamatan, 'id_kelurahanataudesa', data.id_kelurahanataudesa, 'updated_at', data.updated_at, 'id_kegiatan', req.params.id];
                    query = myqsl.format(query, table);
                }

                if (data.surat && data.keterangansurat) {
                    query = checkPatchPekerjaan({
                        fields: 'surat',
                        data: data.surat,
                        fieldsKeterangan: 'keterangansurat',
                        keteranganData: data.keterangansurat,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas && data.keteranganberkas) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas',
                        data: data.berkas,
                        fieldsKeterangan: 'keteranganberkas',
                        keteranganData: data.keteranganberkas,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas2 && data.keteranganberkas2) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas2',
                        data: data.berkas2,
                        fieldsKeterangan: 'keteranganberkas2',
                        keteranganData: data.keteranganberkas2,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas3 && data.keteranganberkas3) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas3',
                        data: data.berkas3,
                        fieldsKeterangan: 'keteranganberkas3',
                        keteranganData: data.keteranganberkas3,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas4 && data.keteranganberkas4) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas4',
                        data: data.berkas4,
                        fieldsKeterangan: 'keteranganberkas4',
                        keteranganData: data.keteranganberkas4,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas5 && data.keteranganberkas5) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas5',
                        data: data.berkas5,
                        fieldsKeterangan: 'keteranganberkas5',
                        keteranganData: data.keteranganberkas5,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas6 && data.keteranganberkas6) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas6',
                        data: data.berkas6,
                        fieldsKeterangan: 'keteranganberkas6',
                        keteranganData: data.keteranganberkas6,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas7 && data.keteranganberkas7) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas7',
                        data: data.surat,
                        fieldsKeterangan: 'keteranganberkas7',
                        keteranganData: data.keteranganberkas7,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas8 && data.keteranganberkas8) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas8',
                        data: data.berkas8,
                        fieldsKeterangan: 'keteranganberkas8',
                        keteranganData: data.keteranganberkas8,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas9 && data.keteranganberkas9) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas9',
                        data: data.berkas9,
                        fieldsKeterangan: 'keteranganberkas9',
                        keteranganData: data.keteranganberkas9,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas10 && data.keteranganberkas10) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas10',
                        data: data.berkas10,
                        fieldsKeterangan: 'keteranganberkas10',
                        keteranganData: data.keteranganberkas10,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas11 && data.keteranganberkas11) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas11',
                        data: data.berkas11,
                        fieldsKeterangan: 'keteranganberkas11',
                        keteranganData: data.keteranganberkas11,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas12 && data.keteranganberkas12) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas12',
                        data: data.berkas12,
                        fieldsKeterangan: 'keteranganberkas12',
                        keteranganData: data.keteranganberkas12,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas13 && data.keteranganberkas13) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas13',
                        data: data.berkas13,
                        fieldsKeterangan: 'keteranganberkas13',
                        keteranganData: data.keteranganberkas13,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas14 && data.keteranganberkas14) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas14',
                        data: data.berkas14,
                        fieldsKeterangan: 'keteranganberkas14',
                        keteranganData: data.keteranganberkas14,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas15 && data.keteranganberkas15) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas15',
                        data: data.berkas15,
                        fieldsKeterangan: 'keteranganberkas15',
                        keteranganData: data.keteranganberkas15,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas16 && data.keteranganberkas16) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas16',
                        data: data.berkas16,
                        fieldsKeterangan: 'keteranganberkas16',
                        keteranganData: data.keteranganberkas16,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas17 && data.keteranganberkas17) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas17',
                        data: data.berkas17,
                        fieldsKeterangan: 'keteranganberkas17',
                        keteranganData: data.keteranganberkas17,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas18 && data.keteranganberkas18) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas18',
                        data: data.berkas18,
                        fieldsKeterangan: 'keteranganberkas18',
                        keteranganData: data.keteranganberkas18,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas19 && data.keteranganberkas19) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas19',
                        data: data.berkas19,
                        fieldsKeterangan: 'keteranganberkas19',
                        keteranganData: data.keteranganberkas19,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas20 && data.keteranganberkas20) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas20',
                        data: data.berkas20,
                        fieldsKeterangan: 'keteranganberkas20',
                        keteranganData: data.keteranganberkas20,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.berkas_pdf && data.keteranganberkas_pdf) {
                    query = checkPatchPekerjaan({
                        fields: 'berkas_pdf',
                        data: data.berkas_pdf,
                        fieldsKeterangan: 'keteranganberkas_pdf',
                        keteranganData: data.keteranganberkas_pdf,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.dokumentasi && data.keterangandokumentasi) {
                    query = checkPatchPekerjaan({
                        fields: 'dokumentasi',
                        data: data.dokumentasi,
                        fieldsKeterangan: 'keterangandokumentasi',
                        keteranganData: data.keterangandokumentasi,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.dokumentasi2 && data.keterangandokumentasi2) {
                    query = checkPatchPekerjaan({
                        fields: 'dokumentasi2',
                        data: data.dokumentasi2,
                        fieldsKeterangan: 'keterangandokumentasi2',
                        keteranganData: data.keterangandokumentasi2,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.dokumentasi3 && data.keterangandokumentasi3) {
                    query = checkPatchPekerjaan({
                        fields: 'dokumentasi3',
                        data: data.dokumentasi3,
                        fieldsKeterangan: 'keterangandokumentasi3',
                        keteranganData: data.keterangandokumentasi3,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.dokumentasi4 && data.keterangandokumentasi4) {
                    query = checkPatchPekerjaan({
                        fields: 'dokumentasi4',
                        data: data.dokumentasi4,
                        fieldsKeterangan: 'keterangandokumentasi4',
                        keteranganData: data.keterangandokumentasi4,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.dokumentasi5 && data.keterangandokumentasi5) {
                    query = checkPatchPekerjaan({
                        fields: 'dokumentasi5',
                        data: data.dokumentasi5,
                        fieldsKeterangan: 'keterangandokumentasi5',
                        keteranganData: data.keterangandokumentasi5,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.dokumentasi6 && data.keterangandokumentasi6) {
                    query = checkPatchPekerjaan({
                        fields: 'dokumentasi6',
                        data: data.dokumentasi6,
                        fieldsKeterangan: 'keterangandokumentasi6',
                        keteranganData: data.keterangandokumentasi6,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.dokumentasi7 && data.keterangandokumentasi7) {
                    query = checkPatchPekerjaan({
                        fields: 'dokumentasi7',
                        data: data.dokumentasi7,
                        fieldsKeterangan: 'keterangandokumentasi7',
                        keteranganData: data.keterangandokumentasi7,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.dokumentasi8 && data.keterangandokumentasi8) {
                    query = checkPatchPekerjaan({
                        fields: 'dokumentasi8',
                        data: data.dokumentasi8,
                        fieldsKeterangan: 'keterangandokumentasi8',
                        keteranganData: data.keterangandokumentasi8,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.dokumentasi9 && data.keterangandokumentasi9) {
                    query = checkPatchPekerjaan({
                        fields: 'dokumentasi9',
                        data: data.dokumentasi9,
                        fieldsKeterangan: 'keterangandokumentasi9',
                        keteranganData: data.keterangandokumentasi9,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                if (data.dokumentasi10 && data.keterangandokumentasi10) {
                    query = checkPatchPekerjaan({
                        fields: 'dokumentasi10',
                        data: data.dokumentasi10,
                        fieldsKeterangan: 'keterangandokumentasi10',
                        keteranganData: data.keterangandokumentasi10,
                        fieldsUpdated: 'updated_at',
                        updated_at: data.updated_at,
                        idPekerjaan: id
                    });
                }

                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.changedRows > 0) {
                            response.ok('Data pekerjaan berhasil diubah!', res);
                        } else {
                            response.ok('Tidak ada perubahan pada data pekerjaan!', res);
                        }
                    }
                });
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    })

}

// Profile
exports.showProfile = (req, res) => {
    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['users', 'id_user', req.params.id];

    query = myqsl.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                response.ok(values, res);
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.editProfile = (req, res) => {
    const data = {
        id: req.params.id,
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        alamat: req.body.alamat,
        foto_profile: req.file
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['users', 'id_user', data.id];

    query = myqsl.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                let newData = {
                    field: '',
                    data: ''
                }

                if (data.nama) {
                    newData = {
                        field: 'nama',
                        data: data.nama
                    }
                }

                if (data.password) {
                    newData = {
                        field: 'password',
                        data: data.password
                    }
                }

                if (data.alamat) {
                    newData = {
                        field: 'alamat',
                        data: data.alamat
                    }
                }

                if (data.foto_profile) {
                    newData = {
                        field: 'foto_profile',
                        data: data.foto_profile
                    }
                }

                let query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
                const table = ['users', newData.field, newData.data, 'id_user', data.id];

                query = myqsl.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.changedRows > 0) {
                            response.ok("Data Profile berhasil diperbarui!", res);
                        } else {
                            return response.ok("Tidak ada perubahan pada data profile!", res);
                        }
                    }
                });
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.paginatedResults = (model) => {
    return (req, res, next) => {
        const page = parseInt(req.query.page) || 1; // default 1
        const limit = parseInt(req.query.limit) || 10; // default 10
        const offset = (page - 1) * limit;

        let query = 'SELECT ??, ??, ??, ??, ??, ??, ??, ?? FROM ?? JOIN ?? USING(??) JOIN ?? USING(??) JOIN ?? USING (??) LIMIT ? OFFSET ?';
        const table = ['id_pekerjaan', 'tanggal_pekerjaan', 'nama_pekerjaan', 'kegiatan.nama_kegiatan', 'kecamatan.nama_kecamatan',
            'kelurahanataudesa.nama_kelurahanataudesa', 'created_at', 'updated_at', model, 'kegiatan', 'id_kegiatan', 'kecamatan',
            'id_kecamatan', 'kelurahanataudesa', 'id_kelurahanataudesa', limit, offset
        ];

        query = myqsl.format(query, table);
        connection.query(query, (error, values) => {
            if (error) {
                console.log(error);
                return response.failed('Bad Request!', 400, res);
            } else {
                if (values.length > 0) {
                    for (let i = 0; i < values.length; i++) {
                        let valuesIndexed = values[i];

                        valuesIndexed.tanggal_pekerjaan = validationDate(valuesIndexed.tanggal_pekerjaan);
                        valuesIndexed.created_at = validationDate(valuesIndexed.created_at);

                        if (valuesIndexed.updated_at) {
                            valuesIndexed.updated_at = validationDate(valuesIndexed.updated_at);
                        }
                    }

                    res.paginatedResults = values;
                    next();
                } else {
                    response.ok('Data tidak ditemukan!', res);
                }
            }
        });
    }
}

function checkPatchPekerjaan(execution) {
    let query = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
    const table = ['pekerjaan', execution.fields, execution.data, execution.fieldsKeterangan, execution.keteranganData, execution.fieldsUpdated, execution.updated_at, 'id_pekerjaan', execution.idPekerjaan];
    return myqsl.format(query, table);
}

function validationDate(execution) {
    return moment(execution).format('DD-M-YYYY');
}