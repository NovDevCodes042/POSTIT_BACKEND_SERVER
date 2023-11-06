const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail} = require('validator')
const bcrypt = require ('bcryptjs')

const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        minlength: 6,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: isEmail,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
},{ timestamps: true});

//hashing password using hooks(This is done b4 u save)
userSchema.pre('save', async function (next) {
    //This function is to be done after save
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


module.exports = mongoose.model("User", userSchema)