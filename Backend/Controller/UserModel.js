const bcrypt = require('bcrypt');
const User = require('../Scemas/User');

// Register Controller
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields correctly'
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 15);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        return res.status(201).send({
            success: true,
            message: 'New user created successfully'
        });
    } catch (error) {
        console.log(error.message || error);
        return res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        });
    }
};

// Get All Users Controller
exports.getUserController = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send({
            usersCount: users.length,
            success: true,
            message: 'All users data retrieved',
            users
        });
    } catch (error) {
        console.log(error.message || error);
        return res.status(500).send({
            success: false,
            message: 'Error in fetching users',
            error
        });
    }
};

// Login Controller
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const { password: _, ...rest } = user._doc;
        return res.status(200).send({
            success: true,
            message: 'User logged in successfully',
            user: rest
        });

    } catch (error) {
        console.log(error.message || error);
        return res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        });
    }
};
