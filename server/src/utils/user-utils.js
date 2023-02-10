const { pool } = require("../config/config");

const getUser = async (userId) => {
	const { rows } = await pool.query("SELECT * FROM users WHERE user_id=$1;", [
		userId,
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
		"INSERT INTO users (name, email, password, cgpa, birth_date, gender, address, father_name, mother_name, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
		[
			name,
			email,
			password,
			mobile,
			birth_date,
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

const updateUserPassword = async (userId, newPassword) => {
	const { rows } = await pool.query(
		"UPDATE users SET password=$1 WHERE user_id=$2 RETURNING *"
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

module.exports = {
	getUser,
	createUser,
	updateUserPassword,
};
