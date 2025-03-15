import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { createPost, deletePost, commentonPost, likeUnlikePost, getAllPosts, getLikedPosts, getFollowingPosts, getUserPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.get("/all", protectRoute, (req, res, next) => {
    console.log("Incoming get all posts request:", req.params.id);
    next();
}, getAllPosts);

router.get("/likes/:id", protectRoute, (req, res, next) => {
    console.log("Incoming get all liked posts request:", req.params.id);
    next();
}, getLikedPosts);

router.get("/following", protectRoute, (req, res, next) => {
    console.log("Get posts of the user we follow:", req.params.id);
    next();
}, getFollowingPosts);

router.get("/user/:username", protectRoute, (req, res, next) => {
    console.log("Get user Posts:", req.params.id);
    next();
}, getUserPosts);










router.post("/create", protectRoute, (req, res, next) => {
    console.log('Incoming POST request to /create:', req.params.id);
    next(); // Continue to the createPost controller
}, createPost);

router.delete("/:id", protectRoute, (req,res,  next) => {
    console.log('Hit DELETE route, Post ID:', req.params.id);
    next();
}, deletePost);


router.post("/like/:id", protectRoute,  (req,res, next)=> {
    console.log('Like the POST, Post ID:', req.params.id);
    next();
}, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentonPost)






export default router;