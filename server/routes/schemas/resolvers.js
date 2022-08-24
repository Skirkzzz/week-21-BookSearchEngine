// import { User } from "../../models/User";
User = require("../../models/User");
const resolvers = {
  Query: {
    user: async (parent, { user = null, params }, res) => {
      const Userauth = await User.findOne({
        $or: [
          { _id: user ? user._id : params.id },
          { username: params.username },
        ],
      });

      if (!Userauth) {
        return res.status(400).json({ message: "Invalid input!" });
      }

      res.json(Userauth);
    },
  },
  Mutation: {
    newUser: async (parent, { body }, res) => {
      const user = await User.create(body);

      if (!user) {
        return res.status(400).json({ message: "Invalid input!" });
      }
      const Token = signToken(user);
      res.json({ token, user });
    },
    login: async (parent, { body }, res) => {
      const user = await User.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const PWAuth = await user.isPasswordAuthorised(body.password);

      if (!PWAuthw) {
        return res.status(400).json({ message: "Invalid input!" });
      }
      const token = signToken(user);
      res.json({ token, user });
    },
    addBook: async (parent, { user, body }, res) => {
      console.log(user);
      try {
        const updateUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: body } },
          { new: true, runValidators: true }
        );
        return res.json(newUser);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    },
    deleteBook: async (parent, { user, params }, res) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { addBooks: { bookId: params.bookId } } },
        { new: true }
      );
      if (!newUser) {
        return res.status(404).json({ message: "Invalid input!" });
      }
      return res.json(newUser);
    },
  },
};

module.exports = resolvers;
