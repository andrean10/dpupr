const controller = require('../controller/user');

module.exports = (app) => {
    app.route('/api/user/pekerjaan')
        .get(controller.paginatedPekerjaan('pekerjaan'), controller.showPekerjaan);
    
    app.route('/api/user/pekerjaan/:id')
        .get(controller.showPekerjaanById)
        .patch(controller.editPekerjaan)
        .delete(controller.deletePekerjaan);
    
    app.route('/api/user/pekerjaan')
        .post(controller.addPekerjaan);
    
    app.route('/api/user/:id')
        .get(controller.showProfile)
        .put(controller.editProfile)
}