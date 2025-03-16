import Notification from '../models/notification.model.js';

export const getNotifications = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            return res.status(400).json({ error: "User not authenticated" });
        }

        const userId = req.user._id;  // Consistent user ID property

        // Fetch notifications and populate "from" field with username and profileImg
        const notifications = await Notification.find({ to: userId }).populate({
            path: "from",
            select: "username profileImg"
        });

        // Mark unread notifications as read
        await Notification.updateMany({ to: userId, read: false }, { read: true });

        res.status(200).json(notifications);

    } catch (error) {
        console.log("Error in getNotifications function", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteNotifications = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            return res.status(400).json({ error: "User not authenticated" });
        }

        const userId = req.user._id;  // Consistent user ID property

        // Delete all notifications for the user
        await Notification.deleteMany({ to: userId });

        res.status(200).json({ message: "Notifications deleted successfully" });

    } catch (error) {
        console.log("Error in deleteNotifications function", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
