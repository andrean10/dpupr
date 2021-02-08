const connection = require('../connection');
const mysql = require('mysql');
const response = require('../res');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

exports.showProgram = (req, res) => {
    response.paging({
        'status': 200,
        'page': res.page,
        'per_page': res.paginatedResults.length,
        'total': res.total,
        'total_pages': res.totalPages,
        'values': res.paginatedResults
    }, res);
}

exports.showProgramById = (req, res) => {
    const idProgram = parseInt(req.params.id);

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['program', 'id_program', idProgram];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed("Bad Request!", 400, res);
        } else {
            if (values.length > 0) {
                response.ok('Data berhasil ditampilkan', res, values);
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.addProgram = (req, res) => {
    const data = {
        nama_program: req.body.namaProgram
    }

    if (!data.nama_program) {
        return response.failed('Parameter Harus Mengirim Data!', 400, res);
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
        idProgram: parseInt(req.params.id),
        nama_program: req.body.namaProgram
    }

    if (Number.isNaN(data.idProgram)) {
        return response.failed('Parameter tidak valid!', 400, res);
    } else if (!data.nama_program) {
        return response.failed('Parameter body tidak ditemukan!', 400, res);
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['program', 'id_program', `${data.idProgram}`];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                let query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
                const table = ['program', 'nama_program', data.nama_program, 'id_program', data.idProgram];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed("Bad Request!", 400, res);
                    } else {
                        if (values.changedRows > 0) {
                            response.ok("Data program berhasil diubah!", res);
                        } else {
                            response.ok("Tidak ada perubahan pada data program!", res);
                        }
                    }
                });
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.deleteProgram = (req, res) => {
    const idProgram = parseInt(req.params.id);

    if (Number.isNaN(idProgram)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['program', 'id_program', idProgram];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                let query = 'DELETE FROM ?? WHERE ?? = ?';
                const table = ['program', 'id_program', req.params.id];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        if (error.errno == 1451) {
                            return response.failed("Gagal Dihapus Karena Program Berkaitan Dengan Data Kegiatan!", 409, res);
                        } else {
                            return response.failed("Bad Request!", 400, res);
                        }
                    } else {
                        if (values.affectedRows > 0) {
                            response.ok("Data program berhasil dihapus!", res);
                        } else {
                            return response.failed('Data program gagal dihapus!', 409, res);
                        }
                    }
                });
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

// kegiatan
exports.showKegiatan = (req, res) => {
    response.paging({
        'status': 200,
        'page': res.page,
        'per_page': res.paginatedResults.length,
        'total': res.total,
        'total_pages': res.totalPages,
        'values': res.paginatedResults
    }, res);
}

exports.showKegiatanById = (req, res) => {
    const idKegiatan = parseInt(req.params.id);

    if (Number.isNaN(idKegiatan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['kegiatan', 'id_kegiatan', idKegiatan];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                response.ok('Data berhasil ditampilkan', res, values);
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.addKegiatan = (req, res) => {
    const data = {
        nama_kegiatan: req.body.namaKegiatan,
        id_program: req.body.idProgram
    }

    if (!data.namaKegiatan && !data.id_program) {
        return response.failed('Parameter Harus Mengirim Data!', 400, res);
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
        idKegiatan: parseInt(req.params.id),
        nama_kegiatan: req.body.namaKegiatan,
        id_program: req.body.idProgram
    }

    if (Number.isNaN(data.id_kegiatan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    } else if (!data.nama_kegiatan) {
        return response.failed('Parameter body tidak ditemukan!', 400, res);
    }

    // check data if exists edit data
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
                const table = ['kegiatan', 'nama_kegiatan', data.nama_kegiatan, 'id_program', data.id_program, 'id_kegiatan', data.idKegiatan];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.changedRows > 0) {
                            response.ok("Data kegiatan berhasil diubah!", res);
                        } else {
                            response.ok("Tidak ada perubahan pada data kegiatan!", res);
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
    const idKegiatan = parseInt(req.params.id);

    if (Number.isNaN(idKegiatan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    // check data if exists delete data
    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['kegiatan', 'id_kegiatan', idKegiatan];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed("Bad Request!", 400, res);
        } else {
            if (values.length > 0) {
                let query = 'DELETE FROM ?? WHERE ?? = ?';
                const table = ['kegiatan', 'id_kegiatan', idKegiatan];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        if (error.errno == 1451) {
                            return response.failed("Gagal Dihapus Karena Kegiatan Berkaitan Dengan Data Pekerjaan!", 409, res);
                        } else {
                            return response.failed("Bad Request!", 400, res);
                        }
                    } else {
                        if (values.affectedRows) {
                            response.ok("Data kegiatan berhasil dihapus!", res);
                        } else {
                            return response.failed('Data kegiatan gagal dihapus!', 409, res);
                        }
                    }
                });
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.showPekerjaan = (req, res) => {
    response.paging({
        'status': 200,
        'page': res.page,
        'per_page': res.paginatedResults.length,
        'total': res.total,
        'total_pages': res.totalPages,
        'values': res.paginatedResults
    }, res);
}

exports.showPekerjaanById = (req, res) => {
    const idPekerjaan = parseInt(req.params.id);

    if (Number.isNaN(idPekerjaan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    let query = "SELECT ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ?? " +
        "FROM ?? " +
        "JOIN ?? ON ?? = ?? " +
        "JOIN ?? ON ?? = ?? " +
        "JOIN ?? ON ?? = ?? " +
        "JOIN ?? ON ?? = ?? " +
        "WHERE ?? = ?";

    const table = ['id_pekerjaan', 'tanggal_pekerjaan', 'nama_pekerjaan', 'program.id_program', 'program.nama_program', 'kegiatan.id_kegiatan',
        'kegiatan.nama_kegiatan', 'kecamatan.id_kecamatan', 'kecamatan.nama_kecamatan', 'kelurahanataudesa.id_kelurahanataudesa',
        'kelurahanataudesa.nama_kelurahanataudesa', 'id_user',
        'pekerjaan',
        'kegiatan', 'kegiatan.id_kegiatan', 'pekerjaan.id_kegiatan',
        'program', 'program.id_program', 'kegiatan.id_program',
        'kelurahanataudesa', 'kelurahanataudesa.id_kelurahanataudesa', 'pekerjaan.id_kelurahanataudesa',
        'kecamatan', 'kecamatan.id_kecamatan', 'kelurahanataudesa.id_kecamatan',
        'id_pekerjaan', idPekerjaan
    ];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                for (let i = 0; i < values.length; i++) {
                    let valuesIn = values[i];
                    valuesIn.tanggal_pekerjaan = validationDate(valuesIn.tanggal_pekerjaan);
                }

                response.ok('Data berhasil ditampilkan', res, values);
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.showSurat = (req, res) => {
    const idPekerjaan = parseInt(req.params.id);

    if (Number.isNaN(idPekerjaan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['pekerjaan', 'id_pekerjaan', idPekerjaan];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                let query = 'SELECT ??, ?? FROM ?? WHERE ?? = ?';
                const table = ['surat', 'keterangansurat', 'pekerjaan', 'id_pekerjaan', idPekerjaan];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.length > 0) {
                            response.ok('Data berhasil ditampilkan', res, values);
                        } else {
                            return response.failed('Data Surat tidak ditemukan!', 404, res);
                        }
                    }
                })
            } else {
                return response.failed('Data Surat tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.showBerkasPdf = (req, res) => {
    const idPekerjaan = parseInt(req.params.id);

    if (Number.isNaN(idPekerjaan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ? ';
    const table = ['pekerjaan', 'id_pekerjaan', idPekerjaan];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                let query = 'SELECT ??, ?? FROM ?? WHERE ?? = ?';
                const table = ['berkas_pdf', 'keteranganberkas_pdf', 'pekerjaan', 'id_pekerjaan', idPekerjaan, ];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.length > 0) {
                            response.ok('Data berhasil ditampilkan', res, values);
                        } else {
                            return response.failed('Data berkas tidak ditemukan!', 404, res);
                        }
                    }
                })
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}


// dokumentasi
exports.showDokumentasiByIdPekerjaan = (req, res) => {
    const idPekerjaan = parseInt(req.params.id);

    if (Number.isNaN(idPekerjaan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['dokumentasi', 'id_pekerjaan', idPekerjaan];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                response.ok('Data Dokumentasi Berhasil Ditampilkan', res, values);
            } else {
                return response.failed('Data dokumentasi tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.showDokumentasiDetailByIdPekerjaan = (req, res) => {
    const idPekerjaan = req.params.id;
    const idDokumentasi = req.params.idDokumentasi;

    let query = 'SELECT * FROM ?? WHERE ?? = ? AND ?? = ?';
    const table = ['dokumentasi', 'id_pekerjaan', idPekerjaan, 'id_dokumentasi', idDokumentasi];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                response.ok('Data berhasil ditampilkan', res, values);
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.addDokumentasi = (req, res) => {
    const imageFile = req.files.dokumentasi;

    const data = {
        dokumentasi: req.files.dokumentasi,
        keterangandokumentasi: req.body.keterangandokumentasi,
        id_pekerjaan: req.params.id,
    }

    let URL;
    if (data) {
        // Cek gambar
        const file = imageFile;
        const filename = file.name;
        const size = file.size;
        const extension = path.extname(filename);

        // allowed ext
        const filetypes = /jpeg|jpg|png/;
        // chech ext
        const extname = filetypes.test(extension.toLowerCase());
        const mimetype = filetypes.test(file.mimetype)

        if (!extname && !mimetype) {
            return response.failed("File tidak di dukung!", 400, res);
        }
        if (size > 15 * 1024 * 1024) {
            return response.failed("File harus kecil dari 15MB", 400, res);
        }

        // mengubah nama dari original file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        URL = `/uploads/dokumentasi/${uniqueSuffix}${path.extname(filename)}`;
        data.dokumentasi = URL;

        let query = 'INSERT INTO ?? SET ?';
        const table = ['dokumentasi'];

        query = mysql.format(query, table);
        connection.query(query, data, (error) => {
            if (error) {
                console.log(error);
                return response.failed('Bad Request!', 400, res);
            } else {
                imageFile.mv('./public' + URL);

                response.ok('Berhasil Menambahkan Data Dokumentasi', res);
            }
        });
    }
}

exports.editDokumentasiDetailByIdPekerjaan = (req, res) => {
    const idPekerjaan = parseInt(req.params.id);
    const idDokumentasi = parseInt(req.params.idDokumentasi);
    const dokumentasi = req.files.dokumentasi;
    const keterangandokumentasi = req.body.keterangandokumentasi;

    let query = 'SELECT * FROM ?? WHERE ?? = ? AND ?? = ?';
    const table = ['dokumentasi', 'id_pekerjaan', idPekerjaan, 'id_dokumentasi', idDokumentasi];
    let valuesImage;

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                valuesImage = values[0].dokumentasi;

                if (dokumentasi) {
                    // Cek gambar
                    const file = dokumentasi;
                    const filename = file.name;
                    const size = file.size;
                    const extension = path.extname(filename);

                    // allowed ext
                    const filetypes = /jpeg|jpg|png/;
                    // chech ext
                    const extname = filetypes.test(extension.toLowerCase());
                    const mimetype = filetypes.test(file.mimetype)

                    if (!extname && !mimetype) {
                        return response.failed("File tidak di dukung!", 400, res);
                    }
                    if (size > 15 * 1024 * 1024) {
                        return response.failed("File harus kecil dari 15MB", 400, res);
                    }

                    // mengubah nama dari original file
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const URL = `/uploads/dokumentasi/${uniqueSuffix}${path.extname(filename)}`;

                    let query = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
                    const table = ['dokumentasi', 'dokumentasi', URL, 'keterangandokumentasi', keterangandokumentasi, 'id_dokumentasi', idDokumentasi];

                    query = mysql.format(query, table);
                    connection.query(query, (error, values) => {
                        if (error) {
                            console.log(error);
                            return response.failed('Bad Request!', 400, res);
                        } else {
                            if (values.affectedRows) {
                                dokumentasi.mv('./public' + URL);

                                deleteBerkasPekerjaan(valuesImage);

                                response.ok('Berhasil Mengubah Data Dokumentasi', res);
                            }
                        }
                    });
                }

            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    })
}

exports.deleteDokumentasiDetailByIdPekerjaan = (req, res) => {
    const idPekerjaan = parseInt(req.params.id);
    const idDokumentasi = parseInt(req.params.idDokumentasi);

    let query = 'SELECT * FROM ?? WHERE ?? = ? AND ?? = ?';
    const table = ['dokumentasi', 'id_pekerjaan', idPekerjaan, 'id_dokumentasi', idDokumentasi];
    let dataImage;

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                dataImage = values[0].dokumentasi;

                let query = 'DELETE FROM ?? WHERE ?? = ?';
                const table = ['dokumentasi', 'id_dokumentasi', idDokumentasi];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.affectedRows) {
                            if (dataImage) {
                                deleteBerkasPekerjaan(dataImage);
                            }

                            response.ok('Dokumentasi Berhasil Dihapus!', res);
                        } else {
                            return response.failed('Data tidak ditemukan!', res);
                        }
                    }
                })

            } else {
                return response.failed('Data Tidak Ditemukan', 404, res);
            }
        }
    })
}

exports.addPekerjaan = (req, res) => {
    const files = req.files;

    const data = {
        nama_pekerjaan: req.body.nama_pekerjaan,
        tanggal_pekerjaan: req.body.tanggal_pekerjaan,
        id_kelurahanataudesa: parseInt(req.body.id_kelurahanataudesa),
        id_kegiatan: parseInt(req.body.id_kegiatan),
        keterangansurat: req.body.keterangansurat,
        keteranganberkas_pdf: req.body.keteranganberkas_pdf,
        id_user: req.body.id_user,
        created_at: moment().format('YYYY-MM-DD')
    }

    let URLSurat;
    let URLBerkas;

    if (files) {
        if (files.surat) {
            // Cek gambar
            const file = files.surat;
            const filename = file.name;
            const size = file.size;
            const extension = path.extname(filename);

            // allowed ext
            const filetypes = /jpeg|jpg|png/;
            // chech ext
            const extname = filetypes.test(extension.toLowerCase());
            const mimetype = filetypes.test(file.mimetype)

            if (!extname && !mimetype) {
                return response.failed("File tidak di dukung!", 400, res);
            }
            if (size > 10 * 1024 * 1024) {
                return response.failed("File harus kecil dari 10MB", 400, res);
            }

            // mengubah nama dari original file
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            URLSurat = `/uploads/surat/${uniqueSuffix}${path.extname(filename)}`;
            data.surat = URLSurat;
        }

        if (files.berkas_pdf) {
            // Cek file pdf
            const file = files.berkas_pdf;
            const filename = file.name;
            const size = file.size;
            const extension = path.extname(filename);

            // allowed ext
            const filetypes = /pdf/;
            // chech ext
            const extname = filetypes.test(extension.toLowerCase());
            const mimetype = filetypes.test(file.mimetype)

            if (!extname && !mimetype) {
                return response.failed("File tidak di dukung!", 400, res);
            }
            if (size > 30 * 1024 * 1024) {
                return response.failed("File harus kecil dari 30MB", 400, res);
            }

            // mengubah nama dari original file
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            URLBerkas = `/uploads/berkas/pdf/${uniqueSuffix}${path.extname(filename)}`;
            data.berkas_pdf = URLBerkas;
        }
    }

    let query = 'INSERT INTO ?? SET ?';
    const table = ['pekerjaan'];

    query = mysql.format(query, table);
    connection.query(query, data, (error) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (files) {
                if (files.surat) {
                    files.surat.mv('./public' + URLSurat);
                }

                if (files.berkas_pdf) {
                    files.berkas_pdf.mv('./public' + URLBerkas);
                }
            }

            response.ok('Data Pekerjaan Berhasil Ditambahkan', res);
        }
    });
}

exports.editPekerjaan = (req, res) => {
    const data = {
        idPekerjaan: parseInt(req.params.id),
        nama_pekerjaan: req.body.nama_pekerjaan,
        tanggal_pekerjaan: req.body.tanggal_pekerjaan,
        id_kelurahanataudesa: parseInt(req.body.id_kelurahanataudesa),
        id_kegiatan: parseInt(req.body.id_kegiatan),
        updated_at: moment().format('YYYY-MM-DD')
    }

    if (Number.isNaN(data.idPekerjaan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    } else if (Number.isNaN(data.id_kelurahanataudesa)) {
        return response.failed('Parameter tidak valid!', 400, res);
    } else if (Number.isNaN(data.id_kegiatan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    // check data if exists edit data
    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['pekerjaan', 'id_pekerjaan', data.idPekerjaan];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed("Bad Request!", 400, res);
        } else {
            if (values.length > 0) {
                let query = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
                const table = ['pekerjaan', 'nama_pekerjaan', data.nama_pekerjaan, 'tanggal_pekerjaan', data.tanggal_pekerjaan,
                    'id_kegiatan', data.id_kegiatan, 'id_kelurahanataudesa', data.id_kelurahanataudesa, 'updated_at', data.updated_at, 'id_pekerjaan', data.idPekerjaan
                ];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.changedRows > 0) {
                            response.ok("Data pekerjaan berhasil diubah!", res);
                        } else {
                            response.ok("Tidak ada perubahan pada data pekerjaan!", res);
                        }
                    }
                });
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.deletePekerjaan = (req, res) => {
    const idPekerjaan = parseInt(req.params.id);

    if (Number.isNaN(idPekerjaan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    let dataFile;

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['pekerjaan', 'id_pekerjaan', idPekerjaan];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                dataFile = values;

                let query = 'DELETE FROM ?? WHERE ?? = ?';
                const table = ['pekerjaan', 'id_pekerjaan', idPekerjaan];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.affectedRows) {
                            const surat = dataFile[0].surat;
                            const berkas_pdf = dataFile[0].berkas_pdf;

                            if (surat) {
                                deleteBerkasPekerjaan(surat)
                            }

                            if (berkas_pdf) {
                                deleteBerkasPekerjaan(berkas_pdf)
                            }

                            response.ok("Data pekerjaan berhasil dihapus!", res);
                        } else {
                            return response.failed('Data pekerjaan gagal dihapus!', 409, res);
                        }
                    }
                })
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.editSurat = (req, res) => {
    const idPekerjaan = parseInt(req.params.id);
    const surat = req.files;
    const keterangansurat = req.body.keterangansurat;
    const updated_at = moment().format('YYYY-MM-DD')

    if (Number.isNaN(idPekerjaan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    if (!surat) {
        return response.failed('Data Surat Tidak Disertakan!', 400, res);
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['pekerjaan', 'id_pekerjaan', idPekerjaan];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                let valuesImage = values[0].surat; // send ke variabel

                const file = surat.surat;
                const filename = file.name;
                const size = file.size;
                const extension = path.extname(filename);

                // allowed ext
                const filetypes = /jpeg|jpg|png/;
                // chech ext
                const extname = filetypes.test(extension.toLowerCase());
                const mimetype = filetypes.test(file.mimetype)

                if (!extname && !mimetype) {
                    return response.failed("File tidak di dukung!", 400, res);
                }
                if (size > 5 * 1024 * 1024) {
                    return response.failed("File harus kecil dari 5MB", 400, res);
                }

                // mengubah nama dari original file
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

                let query = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
                const URL = `/uploads/surat/${uniqueSuffix}${path.extname(filename)}`;
                const table = ['pekerjaan', 'surat', URL, 'keterangansurat', keterangansurat, 'updated_at', updated_at, 'id_pekerjaan', idPekerjaan];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.changedRows > 0) {
                            // cek gambar lama jika ada hapus dari directory
                            if (valuesImage) {
                                deleteBerkasPekerjaan(valuesImage);
                            }

                            surat.surat.mv('./public' + URL)

                            response.ok("Surat berhasil diubah!", res);
                        } else {
                            response.ok('Tidak ada perubahan pada surat!', res);
                        }
                    }
                });
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.deleteSurat = (req, res) => {
    const idPekerjaan = parseInt(req.params.id);

    if (Number.isNaN(idPekerjaan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['pekerjaan', 'id_pekerjaan', idPekerjaan];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                let valuesImage = values[0].surat; // get data image in database

                let query = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
                const table = ['pekerjaan', 'surat', null, 'keterangansurat', null, 'id_pekerjaan', idPekerjaan];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.changedRows > 0) {
                            // cek gambar lama jika ada hapus dari directory
                            if (valuesImage) {
                                deleteBerkasPekerjaan(valuesImage);
                            }
                            response.ok("Surat berhasil dihapus!", res);
                        } else {
                            response.ok('Tidak ada perubahan pada surat!', res);
                        }
                    }
                });
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.editBerkasPDF = (req, res) => {
    const idPekerjaan = parseInt(req.params.id);
    const berkas_pdf = req.files;
    const keteranganberkas_pdf = req.body.keteranganberkas_pdf ? req.body.keteranganberkas_pdf : null;
    const updated_at = moment().format('YYYY-MM-DD');

    if (Number.isNaN(idPekerjaan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    if (!berkas_pdf) {
        return response.failed('Data Berkas PDF Tidak Disertakan!', 400, res);
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['pekerjaan', 'id_pekerjaan', idPekerjaan];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                let valuesBerkasPDF = values[0].berkas_pdf; // send ke variabel global

                // Cek file pdf
                const file = berkas_pdf.berkas_pdf;
                const filename = file.name;
                const size = file.size;
                const extension = path.extname(filename);

                // allowed ext
                const filetypes = /pdf/;
                // chech ext
                const extname = filetypes.test(extension.toLowerCase());
                const mimetype = filetypes.test(file.mimetype)

                if (!extname && !mimetype) {
                    return response.failed("File tidak di dukung!", 400, res);
                }
                if (size > 20 * 1024 * 1024) {
                    return response.failed("File harus kecil dari 20MB", 400, res);
                }

                // mengubah nama dari original file
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

                let query = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
                const URL = `/uploads/berkas/pdf/${uniqueSuffix}${path.extname(filename)}`;
                const table = ['pekerjaan', 'berkas_pdf', URL, 'keteranganberkas_pdf', keteranganberkas_pdf, 'updated_at', updated_at, 'id_pekerjaan', idPekerjaan];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.changedRows > 0) {
                            // cek berkas lama jika ada hapus dari directory
                            if (valuesBerkasPDF) {
                                fs.unlink('./public' + valuesBerkasPDF, (error) => {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Berkas Berhasil Dihapus Dari Directory!');
                                    }
                                });
                            }

                            berkas_pdf.berkas_pdf.mv('./public' + URL)

                            response.ok("Berkas berhasil diubah!", res);
                        } else {
                            response.ok('Tidak ada perubahan pada berkas!', res);
                        }
                    }
                });
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.deleteBerkasPDF = (req, res) => {
    const idPekerjaan = parseInt(req.params.id);

    if (Number.isNaN(idPekerjaan)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['pekerjaan', 'id_pekerjaan', idPekerjaan];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                let valuesBerkasPDF = values[0].berkas_pdf;

                let query = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
                const table = ['pekerjaan', 'berkas_pdf', null, 'keteranganberkas_pdf', null, 'id_pekerjaan', idPekerjaan];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.changedRows > 0) {
                            if (valuesBerkasPDF) {
                                fs.unlink('./public' + valuesBerkasPDF, (error) => {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Berkas Berhasil Dihapus Dari Directory!');
                                    }
                                });
                            }

                            response.ok("Berkas berhasil dihapus!", res);
                        }
                    }
                })
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.showPegawai = (req, res) => {
    response.paging({
        'status': 200,
        'page': res.page,
        'per_page': res.paginatedResults.length,
        'total': res.total,
        'total_pages': res.totalPages,
        'values': res.paginatedResults
    }, res);
}

exports.showPegawaiById = (req, res) => {
    const idPegawai = parseInt(req.params.id);

    if (Number.isNaN(idPegawai)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ? AND ?? = ?';
    const table = ['users', 'id_user', idPegawai, 'id_role', 2];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                for (let i = 0; i < values.length; i++) {
                    let valuesIn = values[i];

                    valuesIn.tanggal_pegawai = validationDate(valuesIn.tanggal_pegawai);
                    valuesIn.created_at = validationDate(valuesIn.created_at);

                    if (valuesIn.updated_at) {
                        valuesIn.updated_at = validationDate(valuesIn.updated_at);
                    }
                }

                response.ok('Data berhasil ditampilkan', res, values);
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.addPegawai = (req, res) => {
    const data = {
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        alamat: req.body.alamat,
        id_role: 2,
        created_at: moment().format('YYYY-MM-DD')
    }

    // cek apakah parameter sudah dikirimkan atau belum
    if (data.nama && data.username && data.password) {
        // cek user yang bersangkutan apakah usernamenya tersedia atau tidak
        let query = 'SELECT * FROM ?? WHERE ?? = ?';
        const table = ['users', 'username', data.username];

        query = mysql.format(query, table);
        connection.query(query, (error, values) => {
            if (error) {
                console.log(error);
                return response.failed('Bad Request!', 400, res);
            } else {
                if (values.length === 0) {

                    let query = 'INSERT INTO ?? SET ?';
                    const table = ['users'];
                    query = mysql.format(query, table);

                    // inisialisasi foto
                    const foto_profile = req.files

                    // user bisa mengirim foto profile atau tidak
                    if (foto_profile) { // ada foto
                        // ambil data
                        const file = foto_profile.foto_profile;
                        const filename = file.name;
                        const size = file.size;
                        const extension = path.extname(filename);

                        // allowed ext
                        const filetypes = /jpeg|jpg|png/;
                        // chech ext
                        const extname = filetypes.test(extension.toLowerCase());
                        const mimetype = filetypes.test(file.mimetype)

                        if (!extname && !mimetype) {
                            return response.failed("File tidak di dukung!", 400, res);
                        }

                        if (size > 3 * 1024 * 1024) {
                            return response.failed("File harus kecil dari 3MB", 400, res);
                        }

                        // mengubah nama dari original file
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const URL = `/uploads/profile_user/pictuser-${uniqueSuffix}${path.extname(filename)}`;
                        data.foto_profile = URL;

                        connection.query(query, data, (error) => {
                            if (error) {
                                console.log(error);
                                return response.failed('Bad Request!', 400, res);
                            } else {
                                // pindahkan foto ke directory

                                const files = file;
                                files.mv('./public' + URL);

                                response.ok('Berhasil menambahkan user baru!', res);
                            }
                        });
                    } else { // tanpa foto
                        connection.query(query, data, (error) => {
                            if (error) {
                                console.log(error);
                                return response.failed('Bad Request!', 400, res);
                            } else {
                                response.ok('Berhasil menambahkan user baru!', res);
                            }
                        });
                    }
                } else {
                    return response.failed('Username sudah digunakan silahkan gunakan username yang lain', 403, res);
                }
            }
        });
    } else {
        return response.failed('Parameter tidak valid!', 400, res);
    }
}

exports.changeFotoPegawai = (req, res) => {
    const idPegawai = req.params.id;
    const foto_profile = req.files;
    const updated_at = moment().format('YYYY-MM-DD');

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['users', 'id_user', idPegawai];

    // init values untuk unlink file gambar
    let dataQuery;

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                dataQuery = values;

                if (foto_profile) { // jika ada gambar yang dikirim
                    const file = foto_profile.foto_profile;
                    const filename = file.name;
                    const size = file.size;
                    const extension = path.extname(filename);

                    // allowed ext
                    const filetypes = /jpeg|jpg|png/;
                    // chech ext
                    const extname = filetypes.test(extension.toLowerCase());
                    const mimetype = filetypes.test(file.mimetype)

                    if (!extname && !mimetype) {
                        return response.failed("File tidak di dukung!", 400, res);
                    }
                    if (size > 3 * 1024 * 1024) {
                        return response.failed("File harus kecil dari 3MB", 400, res);
                    }

                    // mengubah nama dari original file
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const URL = `/uploads/profile_user/pictuser-${uniqueSuffix}${path.extname(filename)}`;

                    let query = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
                    const table = ['users', 'foto_profile', URL, 'updated_at', updated_at, 'id_user', idPegawai];

                    query = mysql.format(query, table);
                    connection.query(query, (error) => {
                        if (error) {
                            console.log(error);
                            return response.failed('Bad Request!', 400, res);
                        } else {
                            let valuesImage = dataQuery[0].foto_profile

                            // remove foto yang sudah ada di directory
                            if (valuesImage) {
                                fs.unlink('./public' + valuesImage, err => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log('File gambar diganti!');
                                    }
                                });
                            }

                            // pindahkan foto baru ke directory uploads
                            const file = foto_profile.foto_profile;
                            file.mv('./public' + URL)

                            response.ok("Foto pegawai berhasil diubah!", res);
                        }
                    });
                } else { // jika gambar kosong
                    let query = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
                    const table = ['users', 'foto_profile', null, 'updated_at', updated_at, 'id_user', idPegawai];

                    query = mysql.format(query, table);
                    connection.query(query, (error) => {
                        if (error) {
                            console.log(error);
                            return response.failed('Bad Request!', 400, res);
                        } else {
                            let valuesImage = dataQuery[0].foto_profile

                            console.log(valuesImage);

                            if (valuesImage) {
                                // remove foto yang sudah ada di directory
                                fs.unlink('./public' + valuesImage, err => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log('File gambar terhapus!');
                                    }
                                });
                            }

                            response.ok("Foto pegawai berhasil dihapus!", res);
                        }
                    });
                }
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.editPegawai = (req, res) => {
    const data = {
        idPegawai: req.params.id,
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        alamat: req.body.alamat,
        updated_at: moment().format('YYYY-MM-DD')
    }

    if (!data.nama && !data.username && !data.password && !data.foto_profile) {
        return response.failed('Tidak ada data yang dikirimkan!', 404, res);
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['users', 'id_user', data.idPegawai];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                let query = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
                const table = ['users', 'nama', data.nama, 'username', data.username, 'password', data.password, 'alamat', data.alamat, 'updated_at', data.updated_at, 'id_user', data.idPegawai];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.changedRows > 0) {
                            response.ok('Data pegawai berhasil diubah!', res);
                        } else {
                            response.ok('Tidak ada perubahan pada data pegawai!', res);
                        }
                    }
                })
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.deletePegawai = (req, res) => {
    const idPegawai = req.params.id;

    if (Number.isNaN(idPegawai)) {
        return response.failed('Parameter tidak valid!', 400, res);
    }

    // check is data exist or not 
    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    const table = ['users', 'id_user', idPegawai];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                // cek gambar
                // init values untuk unlink file gambar
                let dataQuery = values;

                let query = 'DELETE FROM ?? WHERE ?? = ?';
                const table = ['users', 'id_user', idPegawai];

                query = mysql.format(query, table);
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.affectedRows) {
                            // check jika pegawai punya foto profile hapus fotonnya
                            let valuesImage = dataQuery[0].foto_profile;

                            if (valuesImage) {
                                fs.unlink('./public' + valuesImage, err => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log('File gambar dihapus!');
                                    }
                                });
                            }

                            response.ok("Data pegawai berhasil dihapus!", res);
                        } else {
                            return response.failed('Data pegawai gagal dihapus!', 409, res);
                        }
                    }
                });
            } else {
                return response.failed('Data tidak ditemukan!', 404, res);
            }
        }
    });
}

exports.paginatedProgram = (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // default 1
    const limit = parseInt(req.query.limit) || 30; // default 10
    const inputNamaProgram = req.query.namaProgram;

    let query;
    let table;

    if (inputNamaProgram) {
        query = 'SELECT * FROM ?? WHERE ?? LIKE ?';
        table = ['program', 'nama_program', `${inputNamaProgram}%`];
    } else {
        query = 'SELECT * FROM ??';
        table = ['program'];
    }

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed("Bad Request!", 400, res);
        } else {
            if (values.length > 0) {
                const totalPages = Math.ceil(values.length / limit);
                const offset = (page - 1) * limit;
                const totalData = values.length;

                query += `LIMIT ${limit} OFFSET ${offset}`;
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.length > 0) {
                            res.totalPages = totalPages;
                            res.page = page;
                            res.total = totalData;
                            res.paginatedResults = values;
                            next();
                        } else {
                            return response.failed('Data tidak ditemukan!', 404, res);
                        }
                    }
                });
            } else {
                return response.failed("Data tidak ada!", 404, res);
            }
        }
    });
}

exports.paginatedKegiatan = (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // default 1
    const limit = parseInt(req.query.limit) || 30; // default 30
    const inputNamaKegiatan = req.query.namaKegiatan;

    let query;
    let table;

    if (inputNamaKegiatan) {
        query = 'SELECT ??, ??, ??, ?? FROM ?? JOIN ?? USING(??) WHERE ?? LIKE ?';
        table = ['id_kegiatan', 'nama_kegiatan', 'id_program', 'program.nama_program', 'kegiatan', 'program', 'id_program', 'nama_kegiatan', `${inputNamaKegiatan}%`];
    } else {
        query = 'SELECT ??, ??, ??, ?? FROM ?? JOIN ?? USING(??)';
        table = ['id_kegiatan', 'nama_kegiatan', 'id_program', 'program.nama_program', 'kegiatan', 'program', 'id_program'];
    }

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed("Bad Request!", 400, res);
        } else {
            if (values.length > 0) {
                const totalPages = Math.ceil(values.length / limit);
                const offset = (page - 1) * limit;
                const totalData = values.length;

                query += `LIMIT ${limit} OFFSET ${offset}`;
                connection.query(query, (error, values) => {
                    if (error) {
                        console.log(error);
                        return response.failed('Bad Request!', 400, res);
                    } else {
                        if (values.length > 0) {
                            res.totalPages = totalPages;
                            res.page = page;
                            res.total = totalData;
                            res.paginatedResults = values;
                            next();
                        } else {
                            return response.failed('Data tidak ditemukan!', 404, res);
                        }
                    }
                });
            } else {
                return response.failed("Data tidak ada!", 404, res);
            }
        }
    });
}

exports.paginatedPekerjaan = (model) => {
    return (req, res, next) => {
        const page = parseInt(req.query.page) || 1; // default 1
        const limit = parseInt(req.query.limit) || 30; // default 30
        const inputNamaPekerjaan = req.query.namaPekerjaan; // default null
        const inputTglPekerjaan = req.query.tanggalPekerjaan; // default null

        let query;
        let table;

        if (inputNamaPekerjaan) { // search by nama pekerjaan descending tanggal pekerjaan
            query = 'SELECT ??, ??, ??, ??, ??, ??, ??, ?? FROM  ??' +
                'JOIN ?? ON ?? = ?? ' +
                'JOIN ?? ON ?? = ?? ' +
                'JOIN ?? ON ?? = ?? ' +
                'JOIN ?? ON ?? = ?? ' +
                'JOIN ?? USING (??) ' +
                'WHERE ?? LIKE ? ORDER BY ?? DESC ';
            table = ['id_pekerjaan', 'tanggal_pekerjaan', 'nama_pekerjaan', 'kegiatan.nama_kegiatan', 'kecamatan.nama_kecamatan',
                'kelurahanataudesa.nama_kelurahanataudesa', 'id_user', 'users.nama', model,
                'kegiatan', 'kegiatan.id_kegiatan', 'pekerjaan.id_kegiatan',
                'program', 'program.id_program', 'kegiatan.id_program',
                'kelurahanataudesa', 'kelurahanataudesa.id_kelurahanataudesa', 'pekerjaan.id_kelurahanataudesa',
                'kecamatan', 'kecamatan.id_kecamatan', 'kelurahanataudesa.id_kecamatan',
                'users', 'id_user',
                'nama_pekerjaan', `${inputNamaPekerjaan}%`, 'tanggal_pekerjaan'
            ];
        } else if (inputTglPekerjaan) { // search by tanggal pekerjaan
            query = 'SELECT ??, ??, ??, ??, ??, ??, ??, ?? FROM ??' +
                'JOIN ?? ON ?? = ?? ' +
                'JOIN ?? ON ?? = ?? ' +
                'JOIN ?? ON ?? = ?? ' +
                'JOIN ?? ON ?? = ?? ' +
                'JOIN ?? USING (??) ' +
                'WHERE ?? = ? ORDER BY ?? DESC ';
            table = ['id_pekerjaan', 'tanggal_pekerjaan', 'nama_pekerjaan', 'kegiatan.nama_kegiatan', 'kecamatan.nama_kecamatan',
                'kelurahanataudesa.nama_kelurahanataudesa', 'id_user', 'users.nama', model,
                'kegiatan', 'kegiatan.id_kegiatan', 'pekerjaan.id_kegiatan',
                'program', 'program.id_program', 'kegiatan.id_program',
                'kelurahanataudesa', 'kelurahanataudesa.id_kelurahanataudesa', 'pekerjaan.id_kelurahanataudesa',
                'kecamatan', 'kecamatan.id_kecamatan', 'kelurahanataudesa.id_kecamatan', 'users', 'id_user', 'tanggal_pekerjaan',
                `${inputTglPekerjaan}`, 'tanggal_pekerjaan'
            ];
        } else { // data tanpa parameter ambil semua data pekerjaan descending tanggal pekerjaan
            query = 'SELECT ??, ??, ??, ??, ??, ??, ??, ?? FROM ??' +
                'JOIN ?? ON ?? = ??' +
                'JOIN ?? ON ?? = ??' +
                'JOIN ?? ON ?? = ??' +
                'JOIN ?? ON ?? = ??' +
                'JOIN ?? USING (??) ORDER BY ?? DESC ';
            table = ['id_pekerjaan', 'tanggal_pekerjaan', 'nama_pekerjaan', 'kegiatan.nama_kegiatan', 'kecamatan.nama_kecamatan',
                'kelurahanataudesa.nama_kelurahanataudesa', 'id_user', 'users.nama', model,
                'kegiatan', 'kegiatan.id_kegiatan', 'pekerjaan.id_kegiatan',
                'program', 'program.id_program', 'kegiatan.id_program',
                'kelurahanataudesa', 'kelurahanataudesa.id_kelurahanataudesa', 'pekerjaan.id_kelurahanataudesa',
                'kecamatan', 'kecamatan.id_kecamatan', 'kelurahanataudesa.id_kecamatan', 'users', 'id_user', 'tanggal_pekerjaan'
            ];
        }

        query = mysql.format(query, table);
        connection.query(query, (error, values) => {
            if (error) {
                console.log(error);
                return response.failed('Bad Request!', 400, res);
            } else {
                if (values.length > 0) {
                    const totalPages = Math.ceil(values.length / limit);
                    const offset = (page - 1) * limit;
                    const totalData = values.length;

                    query += `LIMIT ${limit} OFFSET ${offset}`;
                    connection.query(query, (error, values) => {
                        if (error) {
                            console.log(error);
                            return response.failed('Bad Request!', 400, res);
                        } else {
                            if (values.length > 0) {
                                for (let i = 0; i < values.length; i++) {
                                    let valuesIndexed = values[i];
                                    valuesIndexed.tanggal_pekerjaan = validationDate(valuesIndexed.tanggal_pekerjaan);
                                }

                                res.totalPages = totalPages;
                                res.page = page;
                                res.total = totalData;
                                res.paginatedResults = values;
                                next();
                            } else {
                                return response.failed('Data tidak ditemukan!', 404, res);
                            }
                        }
                    });
                } else {
                    return response.failed('Data tidak tersedia!', 404, res);
                }
            }
        });
    }
}

exports.paginatedPegawai = (model) => {
    return (req, res, next) => {
        const page = parseInt(req.query.page) || 1; // default 1
        const limit = parseInt(req.query.limit) || 30; // default 15  
        const namaPegawai = req.query.namaPegawai; // default null

        let query;
        let table;

        if (namaPegawai) {
            query = 'SELECT * FROM ?? WHERE ?? = ? AND ?? LIKE ? ';
            table = [model, 'id_role', 2, 'nama', `%${namaPegawai}%`];
        } else { // tanpa parameter
            query = 'SELECT * FROM ?? WHERE ?? = ? ';
            table = [model, 'id_role', 2];
        }

        query = mysql.format(query, table);
        console.log(query);

        connection.query(query, (error, values) => {
            if (error) {
                console.log(error);
                return response.failed('Bad Request!', 400, res);
            } else {
                if (values.length > 0) {
                    const totalPages = Math.ceil(values.length / limit);
                    const offset = (page - 1) * limit;
                    const totalData = values.length;

                    query += `LIMIT ${limit} OFFSET ${offset}`;
                    connection.query(query, (error, values) => {
                        if (error) {
                            console.log(error);
                            return response.failed('Bad Request!', 400, res);
                        } else {
                            if (values.length > 0) {
                                for (let i = 0; i < values.length; i++) {
                                    let valuesIndexed = values[i];

                                    valuesIndexed.created_at = validationDate(valuesIndexed.created_at);

                                    if (valuesIndexed.updated_at) {
                                        valuesIndexed.updated_at = validationDate(valuesIndexed.updated_at);
                                    }
                                }

                                res.totalPages = totalPages;
                                res.page = page;
                                res.total = totalData;
                                res.paginatedResults = values;
                                next();
                            } else {
                                return response.failed('Data tidak ditemukan!', 404, res);
                            }
                        }
                    });
                } else {
                    return response.failed('Data pegawai tidak tersedia!', 404, res);
                }
            }
        });
    }
}

exports.showKegiatanSpinner = (req, res) => {
    let query = 'SELECT * FROM ??';
    const table = ['kegiatan'];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                response.ok('Data berhasil ditampilkan!', res, values);
            } else {
                return response.failed('Data kegiatan tidak ditemukan!', 404, res);
            }
        }
    })
}

exports.showKelurahanAtauDesa = (req, res) => {
    let query = 'SELECT * FROM ??';
    const table = ['kelurahanataudesa'];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                response.ok('Data berhasil ditampilkan', res, values);
            } else {
                return response.failed('Data kelurahan atau desa tidak ditemukan', 404, res);
            }
        }
    });
}

exports.showKecamatanSpinner = (req, res) => {
    let query = 'SELECT * FROM ??';
    const table = ['kecamatan'];

    query = mysql.format(query, table);
    connection.query(query, (error, values) => {
        if (error) {
            console.log(error);
            return response.failed('Bad Request!', 400, res);
        } else {
            if (values.length > 0) {
                response.ok('Data berhasil ditampilkan', res, values);
            } else {
                return response.failed('Data kecamatan tidak ditemukan', 404, res);
            }
        }
    });
}

function validationDate(date) {
    return moment(date).format('DD-M-YYYY');
}

function deleteBerkasPekerjaan(column) {
    fs.unlink('./public' + column, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Data Surat Telah Dihapus!');
        }
    });
}