const { hashPassword, comparePassword } = require("../utils/hash-utils");
const {
	getStudent,
	createStudent,
	updateStudentPassword,
} = require("../utils/student-utils");

const registerStudentHandler = async (req, res) => {
	const {
		name,
		email,
		password,
		cgpa,
		mobile,
		birth_date,
		gender,
		address,
		father_name,
		mother_name,
	} = req.body;

	try {
		let student = await getStudent(email);
		console.log(email);
		if (student) {
			return res
				.status(403)
				.json({ status: "Failed", error: "Email is already in use" });
		}
		const hashedPassword = await hashPassword(password);
		user = await createStudent({
			name,
			email,
			hashedPassword,
			cgpa,
			mobile,
			birth_date,
			gender,
			address,
			father_name,
			mother_name,
		});
		const studentResponse = {
			id: student.student_id,
			name: student.name,
			email: student.email,
			cgpa: student.cgpa,
			mobile: student.mobile,
			birth_date: student.birth_date,
			gender: student.gender,
			address: student.address,
			father_name: student.father_name,
			mother_name: student.mother_name,
			role: student.role,
			entry: student.date_created,
		};
		return res
			.status(200)
			.json({ status: "Success", data: { student: studentResponse } });
	} catch (error) {
		res.status(500).json({
			status: "failed",
			error: "Failed to create student. Please try again later.",
		});
	}
};

const loginStudentHandler = async (req, res) => {
	const { email, password } = req.body;
	try {
		const student = await getStudent(email);
		if (!student) {
			return res.status(404).json({
				status: "failed",
				error: "Student does not exist",
			});
		}
		const compareResult = await comparePassword(password, student.password);
		if (!compareResult) {
			return res.status(404).json({
				status: "failed",
				error: "Incorrect password",
			});
		}
		const studentResponse = {
			id: student.student_id,
			name: student.name,
			email: student.email,
			role: student.role,
		};
		return res.status(200).json({
			status: "Success",
			data: { student: studentResponse },
		});
	} catch (err) {
		res.status(500).json({
			status: "failed",
			error: "Failed to log in. Please try gain later.",
		});
	}
};

const forgotPassStudentHandler = async (req, res) => {
	const { email, newPassword } = req.body;
	try {
		let student = await getStudent(email);
		if (!student) {
			return res.status(404).json({
				status: "failed",
				error: "No student found with this email",
			});
		}
		const hashedPassword = await hashPassword(newPassword);
		await updateStudentPassword(student.student_id, hashedPassword);
		const studentResponse = {
			id: student.student_id,
			name: student.name,
			email: student.email,
			role: student.role,
		};
		return res.status(200).json({
			status: "Success",
			error: { student: studentResponse },
		});
	} catch (error) {
		res.status(500).json({
			status: "failed",
			error: "Failed to change password. Please try again later.",
		});
	}
};

module.exports = {
	registerStudentHandler,
	loginStudentHandler,
	forgotPassStudentHandler,
};
