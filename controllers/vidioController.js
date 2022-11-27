const Vidio = require('../models/vidio');
const asyncHandler = require('express-async-handler');

 
module.exports.vidio_get = asyncHandler(async (req, res) => {
  const vidio = await Vidio.find();
  res.status(200).json({vidio});
});


module.exports.vidio_get_id = asyncHandler(async (req, res) => {
    const vidio = await Vidio.findById(req.params.id);
  
    if (vidio) {
      res.status(200).json(vidio);
    } else {
      res.status(404).json({ message: "Vidio not found" });
    }
  
    
  });


module.exports.vidio_post = asyncHandler(async (req, res) => {
    const { title, description, link , pic } = req.body;

  if (!title || !description |!link || !pic) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const vidio = new Vidio({ title, description, link , pic });

    const createdVidio = await vidio.save();

    res.status(201).json(createdVidio);
  }
})

module.exports.vidio_edit = asyncHandler(async (req, res) => {
    const { title, description, link, pic } = req.body;
  
    const vidio = await Vidio.findById(req.params.id);
  
    if (vidio) {
      vidio.title = title;
      vidio.description = description;
      vidio.link = link;
      vidio.pic = pic;
  
      const updatedVidio = await vidio.save();
      res.status(200).json({message: "Vidio Update", updatedVidio});
    } else {
      res.status(404);
      throw new Error("Vidio not found");
    }
  });

module.exports.vidio_delete = asyncHandler(async (req, res) => {
    const vidio = await Vidio.findById(req.params.id);
  
    if (vidio) {
      await vidio.remove();
      res.status(200).json({ message: "Vidio Removed" });
    } else {
      res.status(404);
      throw new Error("Vidio not Found");
    }
  });