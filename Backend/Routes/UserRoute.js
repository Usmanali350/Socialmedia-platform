const express = require('express');

const router = express.Router();
const {
    registerController,
    getUserController,
    loginController
} = require('../Controller/UserModel');

router.get('/all-users', getUserController);
router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;
