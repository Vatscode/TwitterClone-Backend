import express from "express";
import {signup} from '../controllers/auth.controller.js';
import {login} from '../controllers/auth.controller.js';
import {logout} from '../controllers/auth.controller.js';
import {getMe} from '../controllers/auth.controller.js';
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);

router.post("/signup", signup);

router.post("/login",  login);

router.post("/logout", logout);

export default router;
/*
In Express.js, middleware functions are used to process requests and responses at different
 stages of the request-response lifecycle. They can modify the request or response objects,
  end the request-response cycle, or pass control to the next middleware function in the stack.

Here are some common types of middleware, including protected routes:
*/