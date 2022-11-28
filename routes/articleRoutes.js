const { Router } = require('express');
const articleController = require('../controllers/articleController');
const { requireAuth, isAdmin } = require('../middlewares/authMiddleware');


const router = Router();

router.get('/articles', articleController.article_get);
router.get('/articles/:id', articleController.article_get_id);
router.post('/articles',[requireAuth, isAdmin],articleController.article_post);
router.put('/articles/edit/:id',[requireAuth, isAdmin], articleController.article_edit_put);
router.delete('/articles/:id',[requireAuth, isAdmin], articleController.article_delete)


module.exports = router;