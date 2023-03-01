const { Router } = require("express");
const { userInfoHandler } = require("../controllers/user.controller");

const router = Router();

router.post("/", userInfoHandler);

module.exports = router;
