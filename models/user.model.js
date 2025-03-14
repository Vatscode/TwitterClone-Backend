import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        // Optional: Password validation for strength (e.g., at least one number, one special character, etc.)
        // match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Email regex validation
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
    }],
    profileImg: {
        type: String,
        default: "", // You can keep this as an empty string or change to null if you prefer
    },
    coverImg: {
        type: String,
        default: "", // Same as above, either empty string or null
    },
    bio: {
        type: String,
        default: "",
    },
    link: {
        type: String,
        default: "",
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
