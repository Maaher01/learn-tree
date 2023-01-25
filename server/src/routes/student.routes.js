const { Router } = require("express");
const {
	registerStudentHandler,
	loginStudentHandler,
	forgotPassStudentHandler,
} = require("../controllers/student.controller");

const router = Router();

router.post("/register", registerStudentHandler);
router.post("/login", loginStudentHandler);
router.put("/forgotpassstudent", forgotPassStudentHandler);

module.exports = router;