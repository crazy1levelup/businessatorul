//modules
const express = require('express');
const router = new express.Router();

//models
const User = require('../models/user');
const Role = require('../middleware/role');
//middleware
const auth = require('../middleware/auth');

//api

router.post('/users/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: "All fields are required" });
    }
    const user = new User(req.body)
    user.role = Role.User;

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token })
    } catch (e) {
        if (e.code === 11000) {
            res.status(200).send({ error: "Email already exists" })
        } else if (e.errors.email) {
            res.status(400).send({ error: e.errors.email.message });
        } else if (e.errors.password) {
            res.status(400).send({ error: e.errors.password.message });
        }
    }
})

router.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {

        res.status(400).send({ error: e.message })
    }
})

router.post('/users/logout', auth, async (req, res) => {
    console.log(req.token,'notgji')
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.status(200).send(req.user);
})

//create admin 
const createAdmin = async () => {

    const Admin = await User.findOne({ role: Role.Admin });
    if (Admin) {
        return console.log("admin already created")
    }

    const admin = new User({
        userName: "admin",
        email: "admin@admin.ro",
        password: "administrator",
        role: "Admin"
    })
    await admin.generateAuthToken();
    await admin.save();
}

createAdmin();


module.exports = router;