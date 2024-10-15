import { users } from '../data/users.js';
import bcrypt from 'bcrypt';
import validator from 'validator'; // Import the validator module

export const createUser = (req, res, next) => {
    const { login, email, password, confirm_password } = req.body;

    // Validate the login (can add more conditions for login if needed)
    if (!validator.isAlphanumeric(login) || validator.isEmpty(login)) {
        return res.status(400).send('Invalid login format');
    }

    // Validate the email
    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email format');
    }

    // Validate the password (length, etc.)
    if (!validator.isLength(password, { min: 6 })) {
        return res
            .status(400)
            .send('Password must be at least 6 characters long');
    }

    // Confirm passwords match
    if (password !== confirm_password) {
        return res.status(400).send('Passwords do not match');
    }

    // Check if the user already exists
    const user = users.find((el) => el.login === login || el.email === email);
    if (!user) {
        // Hash the password and add the user to the array
        users.push({
            id: users.length + 1,
            login: login,
            email: email,
            password: bcrypt.hashSync(password, 10), // Hash password
        });
        next();
        return;
    }

    // If user already exists, return an error
    res.status(400).send('User already exists');
};
