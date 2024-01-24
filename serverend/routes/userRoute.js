const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", async (req, res) => {
  try {
    /* check if user already exists */
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User already exists");
    }

    /* hash password */
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    /* Create new User / save User */
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "New user account created successfully!!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    /* check if user already exists */
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }

    /* check user is active or not */
    if ( user.status !== "active")
    {
    throw new Error(`Mr. ${user.name} your account is blocked, please contact the admin`);
    }

    /* compare passwords */
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Invalid Password");
    }

    /* create & asign token */
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret_key, {
      expiresIn: "30d",
    });

    /* send response */
    res.send({
      success: true,
      message: "User Logged in ",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/* get current User */
router.get("/fetchCurrentUser", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: "User successfully fetched from mongdb",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/*  fetch all users */
router.get("/fetchUsers", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      success: true,
      message: "Users displayed successfully",
      data: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/* change User Status*/
router.patch('/changeUserStatus/:id', authMiddleware, async (req, res) => {
  try {
       await User.findByIdAndUpdate(req.params.id, req.body);
          res.send({
          success: true,
            message:  'User Status change successfully',
        }) ; 
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
      }
});
    


module.exports = router;
