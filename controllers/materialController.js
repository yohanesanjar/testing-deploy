const Material = require('../models/material')
const asyncHandler = require('express-async-handler');

 
module.exports.material_get = asyncHandler(async (req, res) => {
  const material = await Material.find();
  res.status(200).json({material});
});


module.exports.material_get_id = asyncHandler(async (req, res) => {
    const material = await Material.findById(req.params.id);
  
    if (material) {
      res.status(200).json(material);
    } else {
      res.status(404).json({ message: "Material not found" });
    }
  
    
  });

module.exports.material_post = asyncHandler(async (req, res) => {
    const { title, description, pic } = req.body;

  if (!title || !description || !pic) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
  } else {
    const material = new Material({ title, description, pic });

    const createdMaterial = await material.save();

    res.status(201).json(createdMaterial);
  }
})

module.exports.material_edit = asyncHandler(async (req, res) => {
    const { title, description, pic } = req.body;
  
    const material = await Material.findById(req.params.id);
  
    if (material) {
      material.title = title;
      material.description = description;
      material.pic = pic;
  
      const updatedMaterial = await material.save();
      res.status(200).json({message: "Material Update", updatedMaterial});
    } else {
      res.status(404);
      throw new Error("Material not found");
    }
  });

module.exports.material_delete = asyncHandler(async (req, res) => {
    const material = await Material.findById(req.params.id);
  
    if (material) {
      await material.remove();
      res.status(200).json({ message: "Material Removed" });
    } else {
      res.status(404);
      throw new Error("Material not Found");
    }
  });