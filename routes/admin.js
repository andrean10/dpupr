const controller = require('../controller/admin');

module.exports = (app) => {
    // program
    app.route('/api/admin/program')
        .get(controller.paginatedProgram, controller.showProgram)
        .post(controller.addProgram);

    app.route('/api/admin/program/:id')
        .get(controller.showProgramById)
        .put(controller.editProgram)
        .delete(controller.deleteProgram);

    //kegiatan
    app.route('/api/admin/kegiatan')
        .get(controller.paginatedKegiatan, controller.showKegiatan)
        .post(controller.addKegiatan);

    app.route('/api/admin/kegiatan/:id')
        .get(controller.showKegiatanById)
        .put(controller.editKegiatan)
        .delete(controller.deleteKegiatan);

    // pekerjaan
    app.route('/api/admin/pekerjaan')
        .get(controller.paginatedPekerjaan('pekerjaan'), controller.showPekerjaan)
        .post(controller.addPekerjaan);

    app.route('/api/admin/pekerjaan/:id')
        .get(controller.showPekerjaanById)
        .put(controller.editPekerjaan)
        .patch(controller.editBerkasSurat)
        .delete(controller.deletePekerjaan);

    // pekerjaan
    // surat
    app.route('/api/admin/pekerjaan/:id/surat')
        .get(controller.showSurat)
        .put(controller.editSurat)
        .delete(controller.deleteSurat);

    // berkas pdf
    app.route('/api/admin/pekerjaan/:id/berkaspdf')
        .get(controller.showBerkasPdf)
        .put(controller.editBerkasPDF)
        .delete(controller.deleteBerkasPDF);

    // kecamatan spinner
    app.route('/api/admin/kecamatan')
        .get(controller.showKecamatanSpinner);

    // kelurahanataudesa spinner
    app.route('/api/admin/kelurahanataudesa')
        .get(controller.showKelurahanAtauDesa);

    // kegiatan spinner
    app.route('/api/admin/kegiatans')
        .get(controller.showKegiatanSpinner);

    // dokumentasi
    app.route('/api/admin/pekerjaan/:id/dokumentasi')
        .get(controller.showDokumentasiByIdPekerjaan)
        .post(controller.addDokumentasi);

    // dokumentasi by id 
    app.route('/api/admin/pekerjaan/:id/dokumentasi/:idDokumentasi')
        .get(controller.showDokumentasiDetailByIdPekerjaan)
        .put(controller.editDokumentasiDetailByIdPekerjaan)
        .delete(controller.deleteDokumentasiDetailByIdPekerjaan);

    // pegawai
    app.route('/api/admin/pegawai')
        .get(controller.paginatedPegawai('users'), controller.showPegawai)
        .post(controller.addPegawai);

    app.route('/api/admin/pegawai/:id')
        .get(controller.showPegawaiById)
        .put(controller.editPegawai)
        .delete(controller.deletePegawai);

    app.route('/api/admin/pegawai/:id/picture')
        .put(controller.changeFotoPegawai);
}