const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("/api/profile/test route:get")
})

module.exports = router;