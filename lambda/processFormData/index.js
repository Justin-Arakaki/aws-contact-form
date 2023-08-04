const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

exports.handler = async event => {
	try {
		const requestBody = JSON.parse(event.body);
		if (
			!requestBody.firstName ||
			!requestBody.lastName ||
			!requestBody.email ||
			!requestBody.phoneNumber
		) {
			throw new Error('Missing required fields.');
		}

		const firstName = requestBody.firstName;
		const lastName = requestBody.lastName;
		const email = requestBody.email;
		const phoneNumber = requestBody.phoneNumber;
		console.log(lastName);

		const query =
			'INSERT INTO contacts (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)';
		const values = [firstName, lastName, email, phoneNumber];

		connection.connect();
		await new Promise((resolve, reject) => {
			connection.query(query, values, err => {
				if (err) reject(err);
				else resolve();
			});
		});
		connection.end();

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Contact stored successfully.' }),
		};
	} catch (error) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: error.message }),
		};
	}
};
