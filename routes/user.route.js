import express from 'express';
import { getUserProfile } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import {followUnfollowUser, getSuggestedUsers, updateUser} from "../controllers/user.controller.js";
// import {updateUserProfile} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/username", protectRoute, getUserProfile) 
router.get("/suggested", protectRoute, getSuggestedUsers)
router.post("/follow/:id", protectRoute, followUnfollowUser) 
router.post("/update",protectRoute, updateUser) 









export default router;
