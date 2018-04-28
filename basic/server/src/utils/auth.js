const jwt = require("jsonwebtoken");

const keys = require("../config/keys");

function getUserId(ctx) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, keys.APP_SECRET);
    return userId;
  }

  throw new AuthError();
}

function getToken(userId) {
  return jwt.sign({ userId }, keys.APP_SECRET);
}

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

module.exports = {
  getUserId,
  AuthError,
  getToken
};
