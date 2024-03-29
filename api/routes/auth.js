const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "Secret Passpharese"
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});



// //LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong User Name!")

    const hashedPassword = CryptoJS.AES
    .decrypt(user.password, "Secret Passpharese");

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
    // const inputPassword = req.body.password;

    // originalPassword !== req.body.password &&
    //   res.status(401).json("Wrong Pass!");

    if(originalPassword !== req.body.password) {
      return res.status(401).send("Wrong credencial");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );


    const { password, ...others } = user._doc;

    res.send({...others, accessToken});
  } catch (err) {
    console.log(err.messsage)
  }

 
});


module.exports = router;