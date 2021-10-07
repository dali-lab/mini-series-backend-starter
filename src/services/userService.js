import jwt from 'jwt-simple';
import User from '../models/user';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const createUser = async (email, firstName, lastName, password, otherFields = {}) => {
  const user = new User({
    email,
    firstName,
    lastName,
    password,
    ...otherFields,
  });
  await user.save();
  return user;
};

export const signInUser = async (user) => {
  const token = tokenForUser(user);
  return { token, email: user.email };
};

export const getUsersByName = async (firstName, lastName) => {
  const users = await User.find({ $or: [{ firstName }, { lastName }] });
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};
