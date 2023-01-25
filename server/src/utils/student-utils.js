const { pool } = require("../config/config");

const getStudent = async (studentId) => {
	const { rows } = await pool.query(
		"SELECT * FROM students WHERE student_id=$1;",
		[studentId]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const createStudent = async ({
	name,
	email,
	hashedPassword: password,
	department,
	semester,
	cgpa,
	mobile,
	birth_date,
	gender,
	address,
	father_name,
	mother_name,
}) => {
	const { rows } = await pool.query(
		"INSERT INTO students (name, email, password, department, semester, cgpa, mobile, birth_date, gender, address, father_name, mother_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
		[
			name,
			email,
			password,
			department,
			semester,
			cgpa,
			mobile,
			birth_date,
			gender,
			address,
			father_name,
			mother_name,
		]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const updateStudentPassword = async (studentId, newPassword) => {
	const { rows } = await pool.query(
		"UPDATE students SET password=$1 WHERE student_id=$2 RETURNING *"
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

module.exports = {
	getStudent,
	createStudent,
	updateStudentPassword,
};
