const express = require("express");
const router = express.Router();

const authRouter = require('./auth.js');
const profileRouter = require('./profile.js');

router.use("/api/auth", authRouter);
router.use("/api/profile", profileRouter);

module.exports = router;