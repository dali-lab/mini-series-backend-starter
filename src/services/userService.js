import User from '../models/user';

export const createUser = async (email, firstName, lastName) => {
  const user = new User({
    email,
    firstName,
    lastName,
  });
  await user.save();
  return user;
};

export const getUsersByName = async (firstName, lastName) => {
  const users = await User.find({ $or: [{ firstName }, { lastName }] });
  return users;
};
