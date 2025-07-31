import userService from "../services/userService.js";

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // 1. check if all fields are provided
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // 2. Check if the user already exists
        const userExists = await userService.checkUserExists(username);
        if (userExists) {
            return res.status(409).json({ message: 'Username already exists.' });
        }

        // 3. encrypt the password
        const hashedPassword = await userService.hashPassword(password);

        // 4. Create the user in the database
        const newUser = await userService.createUser(username, email, hashedPassword);

        // 5. success response
        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });

    } catch (error) {
        res.status(500).send(error.message);
    }
};



// TODO
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // td; input validation.
        // verify if pwd and username are provided
        const user = await userService.verifyUserCredentials(username, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // create session
        req.session.user = {
            id: user.id,
            username: user.username,
        };

        // success response
        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        res.status(500).send(error.message);
    }
};


// not using service for this simple function
const getMe = (req, res) => {
    if (req.session.user) {
        res.status(200).json(req.session.user);
    } else {
        res.status(401).json({ message: 'Not logged in' });
    }
};


const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }

        res.clearCookie('connect.sid'); // 删除 session ID 的 cookie
        res.status(200).json({ message: 'Logged out successfully' });
    });


}

export default {
    register,
    login,
    getMe,
    logout,
};
