const bcrypt = require("bcryptjs");

const authUtils = require("../../utils/auth");

const signup = async ({ args, context }) => {
  const { password: originalPassword, email } = args;
  const password = await bcrypt.hash(originalPassword, 10);
  let user = new context.db.User({ email, password });
  console.log("New User ", user, password);
  await user.save();

  return {
    token: authUtils.getToken(user.id),
    user
  };
};

const login = async ({ args, context }) => {
  const { email, password } = args;
  const user = await context.db.User.findOne({ email });
  if (!user) {
    throw new Error(`No such user found for email: ${email}`);
  }
  console.log("Password ", user, user.password);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  return {
    token: authUtils.getToken(user.id),
    user
  };
};

module.exports = { signup, login };
