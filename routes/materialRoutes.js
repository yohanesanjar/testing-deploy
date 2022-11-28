const { Router } = require('express');
const materialController = require('../controllers/materialController');
const { requireAuth, isAdmin } = require('../middlewares/authMiddleware');


const router = Router();

router.get('/materials', materialController.material_get);
router.get('/materials/:id', materialController.material_get_id);
router.post('/materials',[requireAuth, isAdmin], materialController.material_post);
router.put('/materials/edit/:id',[requireAuth, isAdmin], materialController.material_edit);
router.delete('/materials/:id',[requireAuth, isAdmin], materialController.material_delete)

module.exports = router;