const { hashPassword, comparePassword } = require("../utils/hash-utils");
const {
	getTeacher,
	createTeacher,
	updateTeacherPassword,
} = require("../utils/teacher-utils");

const registerTeacherHandler = async (req, res) => {
	const { name, email, password, mobile, birth_date, gender, address } =
		req.body;

	try {
		let teacher = await getTeacher(email);
		if (teacher) {
			return res
				.status(403)
				.json({ status: "Failed", error: "Email is already in use" });
		}
		const hashedPassword = await hashPassword(password);
		user = await createTeacher({
			name,
			email,
			hashedPassword,
			mobile,
			birth_date,
			gender,
			address,
		});
		const teacherResponse = {
			id: teacher.teacher_id,
			name: teacher.name,
			email: teacher.email,
			mobile: teacher.mobile,
			birth_date: teacher.birth_date,
			gender: teacher.gender,
			address: teacher.address,
			role: teacher.role,
		};
		return res
			.status(200)
			.json({ status: "Success", data: { teacher: teacherResponse } });
	} catch (error) {
		res.status(500).json({
			status: "failed",
			error: "Failed to create teacher. Please try again later.",
		});
	}
};

const loginTeacherHandler = async (req, res) => {
	const { email, password } = req.body;
	try {
		const teacher = await getTeacher(email);
		if (!user) {
			return res.status(404).json({
				status: "failed",
				error: "Teacher does not exist",
			});
		}
		const compareResult = await comparePassword(password, teacher.password);
		if (!compareResult) {
			return res.status(404).json({
				status: "failed",
				error: "Incorrect password",
			});
		}
		const teacherResponse = {
			id: teacher.teacher_id,
			name: teacher.name,
			email: teacher.email,
			role: teacher.role,
		};
		return res.status(200).json({
			status: "Success",
			data: { teacher: teacherResponse },
		});
	} catch (err) {
		res.status(500).json({
			status: "failed",
			error: "Failed to log in. Please try gain later.",
		});
	}
};

const forgotPassTeacherHandler = async (req, res) => {
	const { email, newPassword } = req.body;
	try {
		let teacher = await getTeacher(email);
		if (!teacher) {
			return res.status(404).json({
				status: "failed",
				error: "No teacher found with this email",
			});
		}
		const hashedPassword = await hashPassword(newPassword);
		await updateTeacherPassword(teacher.teacher_id, hashedPassword);
		const teacherResponse = {
			id: teacher.teacher_id,
			name: teacher.name,
			email: teacher.email,
			role: teacher.role,
		};
		return res.status(200).json({
			status: "Success",
			error: { teacher: teacherResponse },
		});
	} catch (error) {
		res.status(500).json({
			status: "failed",
			error: "Failed to change password. Please try again later.",
		});
	}
};

module.exports = {
	registerTeacherHandler,
	loginTeacherHandler,
	forgotPassTeacherHandler,
};
