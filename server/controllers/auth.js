const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const SECRET_ACCESS_TOKEN = "somsung"

async function signupController(req, res) {

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: '❌ Username or email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json({ message: '✅ User created successfully.', User: user });
    }
    catch (err) {
        res.status(500).json({ "errors": err.errors });
    }
}


async function signinController(req, res) {
    try {
        const { usernameOrEmail, password } = req.body;

        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });
        if (!user) {
            return res.status(402).json({ message: '❌ Invalid username or password.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: '❌ Invalid username or password.' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_ACCESS_TOKEN, { expiresIn: '1h' });

        res.status(200).json({ message: '✅ Login successful.', token });
    } catch (err) {
        res.status(500).json({ "errors": err.errors });
    }
}

exports.default = {
    signinController,
    signupController
};