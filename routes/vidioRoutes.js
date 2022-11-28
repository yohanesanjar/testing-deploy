const { Router } = require('express');
const videoController = require('../controllers/vidioController');
const { requireAuth, isAdmin } = require('../middlewares/authMiddleware');


const router = Router();

router.get('/videos', videoController.vidio_get);
router.get('/videos/:id', videoController.vidio_get_id);
router.post('/videos',[requireAuth, isAdmin], videoController.vidio_post);
router.put('/videos/edit/:id',[requireAuth, isAdmin], videoController.vidio_edit);
router.delete('/videos/:id',[requireAuth, isAdmin], videoController.vidio_delete)

module.exports = router;