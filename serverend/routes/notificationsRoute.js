const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Notification = require("../models/notificationModel");

// add a new notification
router.post("/notify", authMiddleware, async(req,res) => {
      try{
        const newNotification = new Notification(req.body);
        await newNotification.save();
        res.send({
             success: true,
             message: "Notification added successfully!!"
        });
      } catch(error){
            res.send({
                 success: false,
                 message: error.message
            });
      }
});

//fetch all products
router.get("/fetchAllNotifications", authMiddleware, async (req, res) => {
    try {
      const notifications = await Notification.find({
          user: req.body.userId,
      }).sort({ createdAt: -1 });
      res.send({
        success: true,
        data: notifications,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
});


//Delete the notification
router.delete("/deleteNotification/:id", authMiddleware, async (req, res) => {
    try {
      await Notification.findByIdAndDelete(req.params.id);
      res.send({
        success: true,
        message: "Notification deleted successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
});

//Seen or read all notifications by user
router.put("/seenAllNotifications/", authMiddleware, async (req, res) => {
    try {
      await Notification.updateMany(
         { user: req.body.userId, seen: false},
         { $set: { seen: true } }
      );
      res.send({
        success: true,
        message: "All Notifications marked as read/seen",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
});

module.exports = router;  
