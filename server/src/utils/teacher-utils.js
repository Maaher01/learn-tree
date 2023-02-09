const { pool } = require("../config/config");

const getTeacher = async (teacherId) => {
	const { rows } = await pool.query(
		"SELECT * FROM teachers WHERE teacher_id=$1;",
		[teacherId]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const createTeacher = async ({
	name,
	email,
	hashedPassword: password,
	mobile,
	birth_date,
	gender,
	address,
}) => {
	const { rows } = await pool.query(
		"INSERT INTO teachers (name, email, password, mobile, birth_date, gender, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
		[name, email, password, mobile, birth_date, gender, address]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const updateTeacherPassword = async (teacherId, newPassword) => {
	const { rows } = await pool.query(
		"UPDATE teachers SET password=$1 WHERE teacher_id=$2 RETURNING *"
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

module.exports = {
	getTeacher,
	createTeacher,
	updateTeacherPassword,
};
