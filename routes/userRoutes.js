const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();
const SECRET_KEY = "your-secret-key-here";
router.get('/admin',authMiddleware,roleMiddleware('admin'), (req, res) => {
  res.json({ message: "Welcome, admin!" });
});

router.post("/register", async (req, res) => {
  const { username, password, role = "user" } = req.body;
  try {
    const hashedPassword=await bcrypt.hash(password,10)
    const user= await User.create({username,password:hashedPassword,role})
    res.status(201).json({message:'Reg. success',user})
  } catch (error) {
    res.status(500).json({message:'Registration failed',error:error.message})
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user=await User.findOne({where:{username}})
    if (!user){
        return res.status(404).json({message:'User not found'})
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if (!isPasswordValid){
        return res.status(401).json({message:'Invalid password'})
    }
    const token= jwt.sign(
      {id:user.id,username:user.username,role:user.role},
      SECRET_KEY,
      {expiresIn:'1h'}
    )
    res.json({message:'Login success',token}
    )
  } catch (error) {
    res.status(500).json({message:'Login failed',error:error.message})
  }
})


module.exports = router;
