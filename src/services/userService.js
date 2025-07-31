import db from '../db/db.js';
import bcrypt from 'bcrypt';

// database connection


/////
//// register services
////
const checkUserExists = async (username) => {
  try {
    const [rows] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
    return rows.length > 0;
  } catch (err) {
    console.error('Error in checkUserExists:', err);
    throw new Error('Failed to check user existence');
  }
};

// encrypt the password
const hashPassword = async (plainPassword) => {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (err) {
    console.error('Error in hashPassword:', err);
    throw new Error('Failed to hash password');
  }
};

// create a new user
const createUser = async (username, email, hashedPassword) => {
  try {
    const [result] = await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return { id: result.insertId, username, email };
  } catch (err) {
    console.error('Error in createUser:', err);
    //
    if (err.code === 'ER_DUP_ENTRY') {
      throw new Error('Username already exists');
    }
    throw new Error('Failed to create user');
  }
};



///
/// login services
///

//TODO
const verifyUserCredentials = async (username, password) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    return user;
  } catch (err) {
    console.error('Error in verifyUserCredentials:', err);
    throw new Error('Failed to verify user credentials');
  }
};


export default {
  checkUserExists,
  hashPassword,
  createUser,
  verifyUserCredentials
};




