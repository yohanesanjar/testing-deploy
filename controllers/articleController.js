const Article = require('../models/article');
const asyncHandler = require('express-async-handler');

 
module.exports.article_get = asyncHandler(async (req, res) => {
  const article = await Article.find();
  res.status(200).json({article:article});
});


module.exports.article_get_id = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);
  
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  
    
  });


module.exports.article_post = asyncHandler(async (req, res) => {
    const { title, description, pic } = req.body;

  if (!title || !description || !pic) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const article = new Article({ title, description, pic });

    const createdArticle = await article.save();

    res.status(201).json(createdArticle);
  }
})

module.exports.article_edit_put = asyncHandler(async (req, res) => {
    const { title, description, pic } = req.body;
  
    const article = await Article.findById(req.params.id);
  
    if (article) {
      article.title = title;
      article.description = description;
      article.pic = pic;
  
      const updatedArticle = await article.save();
      res.status(200).json({message: "Article Update", updatedArticle});
    } else {
      res.status(404);
      throw new Error("Article not found");
    }
  });

module.exports.article_delete = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);
  
    if (article) {
      await article.remove();
      res.status(200).json({ message: "Article Removed" });
    } else {
      res.status(404);
      throw new Error("Article not Found");
    }
  });
