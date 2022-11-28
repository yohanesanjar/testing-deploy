const { Router } = require('express');
const videoController = require('../controllers/videoController');
const { requireAuth, isAdmin } = require('../middlewares/authMiddleware');


const router = Router();

router.get('/videos', videoController.video_get);
router.get('/videos/:id', videoController.video_get_id);
router.post('/videos',[requireAuth, isAdmin], videoController.video_post);
router.put('/videos/edit/:id',[requireAuth, isAdmin], videoController.video_edit);
router.delete('/videos/:id',[requireAuth, isAdmin], videoController.video_delete)

module.exports = router;