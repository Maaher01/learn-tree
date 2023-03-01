const { pool } = require("../config/config");

const getUserInfo = async (user_id) => {
	const { rows } = await pool.query(
		"SELECT users.role, classes.class_name, subjects.subject_name FROM users JOIN class_enrollment ON users.user_id = class_enrollment.user_id JOIN classes ON class_enrollment.class_id = classes.class_id JOIN subject_enrollment ON users.user_id = subject_enrollment.user_id JOIN subjects ON subject_enrollment.subject_id = subjects.subject_id WHERE users.user_id = $1;",
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
	getUserInfo,
	// getUserRole,
};
