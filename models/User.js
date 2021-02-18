const mongoose = require('mongoose');
const { Schema } = mongoose; // This is the same as const Schema = mongoose.Schema

// With Schema, we need to indicate what different properties our records may have
const userSchema = new Schema({
    googleId: String,
    name: String,
    credits: { type: Number, default: 0},
});

mongoose.model('users', userSchema);