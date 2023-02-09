const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { databaseConnection } = require("./config/config");
const teacherRouter = require("./routes/teacher.routes");
const studentRouter = require("./routes/student.routes");

const app = express();

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
app.use(express.json());

//Routes
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);

const server = app.listen(PORT, async () => {
	await databaseConnection();
	console.log(`Server is running on port ${PORT}`);
});
