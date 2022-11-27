const { Router } = require('express');
const articleController = require('../controllers/articleController');


const router = Router();

router.get('/articles', articleController.article_get);
router.get('/articles/:id', articleController.article_get_id);
router.post('/articles', articleController.article_post);
router.put('/articles/edit/:id',articleController.article_edit_put);
router.delete('/articles/:id',articleController.article_delete)


module.exports = router;