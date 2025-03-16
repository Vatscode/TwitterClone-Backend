import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {v2 as cloudinary}  from "cloudinary";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";



dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    console.error("MONGODB_URI is not defined");
    process.exit(1); // Exit the application if the URI is not set
}

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the application on connection error
    });

const app = express();

console.log('MongoDB URI:', mongoURI);
//a function which runs before/after you perform an action (between req, res)
app.use(express.json()); //to parse req.body
app.use(cookieParser());
app.use(express.urlencoded({extended: true})); //you must pass this before calling the 
// route or else youll recieve an error

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);



 //to parse url encoded data


const PORT = process.env.PORT || 8001; // Use environment variable for port
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
 

})
