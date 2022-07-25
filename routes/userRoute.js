const express = require('express');
const UserModel = require('../models/userModel');

const router = express.Router();

router.post('/login', async (req, res) => {
    console.log("Login");
    try {
        await UserModel.findOne({ userId: req.body.userId, password: req.body.password });
        if (user) {
        res.send('Login Successfull');
        } else {
             res.status(400).json({ message: 'Login failed' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/register', async (req, res) => {
    try {
        const newUser = new UserModel({ ...req.body, verified: true });
        await newUser.save();
        res.send("Registered successfully");
    } catch (error) {
        res.status(400).json(error);
    }
});

// router.post('/register', async (req, res) => {
//     try {
//         const newUser = new UserModel({ ...req.body, verified: false });
//         await newUser.save();
//         res.status(201).json(newUser);
//         res.send("User Registered successfully");
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });



module.exports = router;
