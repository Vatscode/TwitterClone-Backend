import express from "express";
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";


import authRoutes from "./routes/auth.routes.js";
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const app = express();


console.log('MongoDB URI:', mongoURI); 

app.use("/api/auth",authRoutes);


app.listen(8001, () =>{
    console.log("Server is running on port 8001");
 

})
