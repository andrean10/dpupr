const controller = require('../controller/admin');
const express = require('express');
const router = express.Router();

// module.exports = (route) => {
//     route.get('/', (req, res) => {
//         res.send("Halaman Admin!");
//     });

//     route.get('/:id', (req, res) => {
//         res.send(req.params.id);
//     });
// }

// program
router.get('/', controller.index);
router.get('/program', controller.program);
router.get('/program/:id', controller.programById);
router.post('/program', controller.addProgram);
router.put('/program/:id', controller.editProgram);
router.delete('/program/:id', controller.deleteProgram);

// kegiatan
router.get('/kegiatan', controller.showKegiatan);
router.get('/kegiatan/:id', controller.showKegiatanById);
router.post('/kegiatan', controller.addKegiatan);
router.put('/kegiatan/:id', controller.editKegiatan);
router.delete('/kegiatan/:id', controller.deleteKegiatan);

module.exports = router;