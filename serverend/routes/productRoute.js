const router = require("express").Router();
const Product = require("../models/productModel");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");

const User = require("../models/userModel");
const Notification = require("../models/notificationModel");

/* add new product */
router.post("/addProduct", authMiddleware, async (req, res) => {
  try {
    const newProduuct = new Product(req.body);
    await newProduuct.save();
    /*  send notification to admin */
    const admins = await User.find({ role: "admin"});
    const user = await User.findById(newProduuct.seller);
    admins.forEach(async (admin) => {
        const newNotification = new Notification({
          user: admin._id,
          message: `New product added by ${user.name}`,
          title: "New Product",
          onClick: `/admin`,
          seen: false,  
        });
        await newNotification.save();
    });
    res.send({
      success: true,
      message: "New Product inserted successfully!!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//fetch all products
router.post("/fetchProducts", authMiddleware, async (req, res) => {
  try {
    const { seller, category = [], year = [], status } = req.body;
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    if (status) {
      filters.status = status;
    }

    /* Filter by category */
    if(category.length > 0){
      filters.category = { $in: category };
    }

    /* filter by year */
    if (year.length > 0){
        year.forEach((item) => {
            const fromYear = item.split("-")[0];
            const toYear = item.split("-")[1];
            filters.year = { $gte: fromYear, $lte: toYear };
        });
    }

    const products = await Product.find(filters)
      .populate("seller")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//update the existing product by id
router.put("/updateProduct/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//Delete the existing product by id
router.delete("/deleteProduct/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/* get image from computer */
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

/*  handling image uploading into cloudinary */
router.post(
  "/uploadImageToProduct",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      /* upload image to cloudinary */
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "flipcartMP",
      });
      const productId = req.body.productId;
      await Product.findByIdAndUpdate(productId, {
        $push: { images: result.secure_url },
      });
      res.send({
        success: true,
        message: "Image Upload Successfully",
        data: result.secure_url,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

/* change product status */
router.put("/changeProductStatus/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { status });

    // send notification to seller 
    const newNotification = new Notification({
      user: updatedProduct.seller,
      message: `Your product ${updatedProduct.title} has been ${status}`,
      title: "Product Status Updated",
      onClick: `/profile`,
      seen: false,  
    });
    await newNotification.save(); 
    res.send({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    res.send({
      succuess: false,
      message: error.message,
    });
  }
});

/* Get a single product by id */
router.get("/fetchProductById/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller');
    res.send({
      success: true,
      data: product
    });
  } catch (error) {
    res.send({
      succuess: false,
      message: error.message,
    });
  }
});

module.exports = router;
