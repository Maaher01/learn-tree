const { Router } = require("express");
const {
	registerTeacherHandler,
	loginTeacherHandler,
	forgotPassTeacherHandler,
} = require("../controllers/teacher.controller");

const router = Router();

router.post("/register", registerTeacherHandler);
router.post("/login", loginTeacherHandler);
router.put("/forgotpassteacher", forgotPassTeacherHandler);

module.exports = router;
