const { v4: uuidv4 } = require('uuid');

const sessions = {};

const createSession = (username) => {
    const sessionId = uuidv4();
    sessions[sessionId] = { username };
    return sessionId;
};

const getSession = (sessionId) => {
    return sessions[sessionId];
};

const deleteSession = (sessionId) => {
    delete sessions[sessionId];
};

const existSession = (sessionId) => {
    return getSession(sessionId) !== undefined;
};

module.exports = {
    createSession,
    getSession,
    deleteSession,
    existSession
};