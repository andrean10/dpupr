const controller = require('../controller/user');

module.exports = (app) => {
    app.route('/api/user/pekerjaan')
        .get(controller.paginatedResults('pekerjaan'), controller.showPekerjaan);
    
    app.route('/api/user/pekerjaan/:id')
        .get(controller.showPekerjaanById)
        .patch(controller.editPekerjaan);
    
    app.route('/api/user/pekerjaan')
        .post(controller.addPekerjaan);
    
    app.route('/api/user/profile/:id')
        .get(controller.showProfile)
        .patch(controller.editProfile)
    
}