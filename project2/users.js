const onlineUsers = [];
const chatHistory = [];

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function isValidMessage(message) {
  let isValid = true;
  const regex = /<\s*[a-zA-Z]+\b[^>]*>(.*?)<\s*\/\s*[a-zA-Z]+\s*>/gi;
  isValid = isValid && !regex.test(message);
  return isValid;
}

module.exports = {
  isValidUsername,
  isValidMessage,
  onlineUsers,
  chatHistory,
};
