//modules
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const role = require('../middleware/role')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email invalid")
            }
        },
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw Error("Password must be higher than 6 characters")
            } else if (value.toLowerCase().includes("password")) {
                throw Error("Password cannot be password")
            }
        }
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: role.User
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})


//this method is called automatically and it removes some fields before sending the result ex: deletes password,stored tokens
userSchema.methods.toJSON = function () {
    const user = this;

    const userObject = user.toObject()
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}


//this static method can be called on models ex: User.findByCredentials()
//tries to find the user by email and if password is a match return the user
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Unable to login")
    }

    return user;
}

//this method can be called on instance of an object
// ex: const user = new User()
// user.generateAuthToken()

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT)
    user.tokens = user.tokens.concat({ token }); //add the created token to the token list in case user logs in from different devices
    await user.save();
    return token;
}

userSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema);


module.exports = User;