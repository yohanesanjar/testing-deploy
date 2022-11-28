const Video = require('../models/Video');
const asyncHandler = require('express-async-handler');

 
module.exports.video_get = asyncHandler(async (req, res) => {
  const video = await Video.find();
  res.status(200).json({video});
});


module.exports.video_get_id = asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id);
  
    if (video) {
      res.status(200).json(video);
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  
    
  });


module.exports.video_post = asyncHandler(async (req, res) => {
    const { title, description, link , pic } = req.body;

  if (!title || !description |!link || !pic) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const video = new Video({ title, description, link , pic });

    const createdVideo = await video.save();

    res.status(201).json(createdVideo);
  }
})

module.exports.video_edit = asyncHandler(async (req, res) => {
    const { title, description, link, pic } = req.body;
  
    const video = await Video.findById(req.params.id);
  
    if (video) {
      video.title = title;
      video.description = description;
      video.link = link;
      video.pic = pic;
  
      const updatedVideo = await video.save();
      res.status(200).json({message: "Vidio Update", updatedVideo});
    } else {
      res.status(404);
      throw new Error("Vidio not found");
    }
  });

module.exports.video_delete = asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id);
  
    if (video) {
      await video.remove();
      res.status(200).json({ message: "Vidio Removed" });
    } else {
      res.status(404);
      throw new Error("Vidio not Found");
    }
  });