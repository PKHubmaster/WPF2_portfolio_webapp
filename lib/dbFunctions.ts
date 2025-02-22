import bcrypt from 'bcryptjs';
import SystemUser from '../models/SystemUserModel';

// Get a user by username
export const getUserByUsername = async (systemUserName: string) => {
  try {
    return await SystemUser.findOne({ systemUserName });
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

// Create a new user with hashed password
export const createUser = async (systemUserName: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new SystemUser({ systemUserName, password: hashedPassword });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error('Error creating user');
  }
};
