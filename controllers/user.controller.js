import bcrypt from 'bcryptjs';
import {v2 as cloudinary}  from 'cloudinary';

// Models
import User from '../models/user.model.js';
import Notification from '../models/notification.model.js';

export const getUserProfile = async (req, res) => {
    const {username} = req.params; // To get the dynamic value
    try {
        const user = await User.findOne({username}).select("-password");
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in getUserProfile: ", error.message);
    }
}

export const followUnfollowUser = async (req, res) => {
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({error: "You can't follow/unfollow yourself"});
        }
        if (!userToModify || !currentUser) return res.status(400).json({error: "User not found"});

        const isFollowing = currentUser.following.some(followedUserId => followedUserId.toString() === id);

        if (isFollowing) {
            // Unfollow the user
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            res.status(200).json({ message: "User Unfollowed successfully" });
        } else {
            // Follow the user
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

            // Send notification to the user
            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id,
            });

            await newNotification.save();

            res.status(200).json({message: "User followed successfully"});
        }
    } catch (error) {
        console.log("Error in followUnfollowUser: ", error.message);
        res.status(500).json({error: error.message});
    }
}

export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;

        const usersFollowedByMe = await User.findById(userId).select("following");

        if (!usersFollowedByMe) {
            return res.status(404).json({ error: "User not found" });
        }

        const users = await User.aggregate([
            { $match: { _id: { $ne: userId } } },
            { $sample: { size: 10 } }
        ]);

        const following = usersFollowedByMe.following || [];

        const filteredUsers = users.filter((user) => !following.includes(user._id.toString()));
        const suggestedUsers = filteredUsers.slice(0, 4);

        // Remove passwords before sending response
        suggestedUsers.forEach((user) => user.password = null);

        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log("Error in getSuggestedUsers: ", error.message);
        res.status(500).json({ error: error.message });
    }
}

export const updateUser = async (req, res) => {
    console.log("Request body:", req.body);
    const { fullName, email, currentPassword, newPassword, bio, link } = req.body;
    let { profileImg, coverImg } = req.body;

    const userId = req.user._id;

    try {
        let user = await User.findById(userId);
        if (!user) return res.status(400).json({ message: "User not found" });

        // Ensure both currentPassword and newPassword are provided if updating password
        if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ error: "Please provide both current password and new password" });
        }

        // Handle password update
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

            if (newPassword.length < 6) {
                return res.status(400).json({ error: "Password must be at least 6 characters long" });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        // Check if the new email is already taken
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "Email is already taken" });
            }
        }

        // Log the current email and new email for debugging
        console.log("Current email:", user.email);
        console.log("New email:", email);

        // Handle profile image upload if provided
        if (profileImg) {
            console.log("Uploading new profile image...");
            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadedResponse.secure_url;
            console.log("Profile image uploaded successfully:", profileImg);
        }

        // Handle cover image upload if provided
        if (coverImg) {
            console.log("Uploading new cover image...");
            if (user.coverImg) {
                console.log("Deleting old cover image from Cloudinary...");
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
            }

            const uploadedResponse = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadedResponse.secure_url;
            console.log("Cover image uploaded successfully:", coverImg);
        }
        console.log("Full name:", fullName);
        console.log("Email:", email);
        console.log("Bio:", bio);
        console.log("Profile Image URL:", profileImg);

        // Update user fields with the provided data or existing values
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.profileImg = profileImg || user.profileImg;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.coverImg = coverImg || user.coverImg;

        // Save the updated user data
        user = await user.save();

        // Log the updated user object before sending the response
        console.log("Updated user object:", user);

        // Remove password from the response
        user.password = null;

        return res.status(200).json({ user });
    } catch (error) {
        console.log("Error in updateUser: ", error.message);
        res.status(500).json({ error: error.message });
    }
};




