import * as userService from '../services/userService';
import * as officeService from '../services/officeService';

export const getUsers = async (req, res) => {
  try {
    const { firstName, lastName, id } = req.query;
    if (id) {
      const user = await userService.getUserById(id);
      return res.status(200).json({ user });
    } else if (firstName || lastName) {
      const users = await userService.getUsersByName(firstName, lastName);
      return res.status(200).json(users);
    } else {
      return res.status(400).send({ error: 'Invalid query.' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const signUpUser = async (req, res) => {
  try {
    const {
      email, firstName, lastName, password,
    } = req.body;
    const quote = await officeService.getRandomOfficeQuote();
    const user = await userService.createUser(email, firstName, lastName, password, { quote });
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const signInUser = async (req, res) => {
  try {
    const userData = await userService.signInUser(req.user);
    return res.status(200).json(userData);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400);

    await userService.deleteUser(id);
    return res.status(200).send('Successfully deleted user');
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};
