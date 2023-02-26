const { pool } = require("../config/config");

const getUser = async (email) => {
	const { rows } = await pool.query("SELECT * FROM users WHERE email=$1;", [
		email,
	]);
	if (rows) {
		return rows[0];
	}
	return null;
};

const createUser = async ({
	name,
	email,
	hashedPassword: password,
	mobile,
	birth_date,
	gender,
	address,
	father_name,
	mother_name,
	role,
}) => {
	const { rows } = await pool.query(
		"INSERT INTO users (name, email, password, birth_date, mobile, gender, address, father_name, mother_name, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
		[
			name,
			email,
			password,
			birth_date,
			mobile,
			gender,
			address,
			father_name,
			mother_name,
			role,
		]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const updateUserPassword = async (email, newPassword) => {
	const { rows } = await pool.query(
		"UPDATE users SET password=$1 WHERE email=$2 RETURNING *",
		[newPassword, email]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const getUserInfo = async (user_id) => {
	const { rows } = await pool.query(
		"SELECT users.user_id, users.role, classes.class_name, subjects.subject_name FROM users JOIN class_enrollment ON users.user_id = class_enrollment.user_id JOIN classes ON class_enrollment.class_id = classes.class_id JOIN subject_enrollment ON users.user_id = subject_enrollment.user_id JOIN subjects ON subject_enrollment.subject_id = subjects.subject_id WHERE users.user_id = $1;",
		[user_id]
	);
	if (rows) {
		return rows;
	}
	return null;
};

// const getUserRole = async (user_id) => {
// 	const { rows } = await pool.query(
// 		"SELECT role FROM users WHERE user_id=$1;",
// 		[user_id]
// 	);
// 	if (rows) {
// 		return rows[0];
// 	}
// 	return null;
// };

module.exports = {
	getUser,
	createUser,
	updateUserPassword,
	getUserInfo,
	// getUserRole,
};
