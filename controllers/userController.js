const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

module.exports.signup = asyncHandler(async (req, res) => {
    const { full_name, email, username, password, role, pic } = req.body;

    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if(!email.match('@')){
      res.status(400);
      throw new Error("Please enter a valid email");
    }
    if( password.length < 6){
      res.status(400);
      throw new Error("Minimum password is 6");
    }
    //no fields
    if (!full_name || !email || !username || !password) {
      res.status(400);
      throw new Error("Please Fill all the fields");
    }
    //email exist
    if(emailExists){
      res.status(400);
      throw new Error('Email Already Exists');
    }
    //username exist
    if(usernameExists){
      res.status(400);
      throw new Error('Username Already Exists');
    }

    const user = await User.create({
        full_name, 
        email, 
        username, 
        password, 
        role, 
        pic
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            full_name: user.full_name,
            email: user.email, 
            username: user.username,
            role: user.role,
            pic: user.pic
        });
    }else{
        res.status(400)
        throw new Error('User Not Found')
    }
});

module.exports.signin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    if(user.role == 'admin'){
      res.status(200).json({
        message: 'akan ke halaman admin',
        user: user,
        token: generateToken(user._id)
      }); 
    }else if(user.role == 'user'){
      res.status(200).json({
        message: 'akan ke halaman user',
        user: user,
        token: generateToken(user._id)
      });
    }else{
      res.status(404).json({
        message: 'role tidak diketahui'
      })
    }
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports.update_profile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.full_name = req.body.full_name || user.full_name;
      user.email = req.body.email || user.email;
      user.username = req.body.username || user.username;
      if (req.body.password) {
        user.password = req.body.password;
      }
      user.pic = req.body.pic || user.pic;
  
      const updatedUser = await user.save();
  
      res.json({
        message: 'user berhasil diupdate',
        _id: updatedUser._id,
        full_name: updatedUser.full_name,
        email: updatedUser.email,
        username: updatedUser.username,
        role: updatedUser.role,
        pic: updatedUser.pic,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  });

module.exports.user_delete = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.status(200).json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("user not Found");
  }
});

module.exports.user_get = asyncHandler(async (req, res) => {
    const user = await User.find();
  res.status(200).json({user});
})

module.exports.user_get_id = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message:  'User not found' });
    }
})