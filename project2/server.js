const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const sessions = require("./sessions");
const users = require("./users");

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

app.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json({ username });
});

app.post("/api/session", (req, res) => {
  const { username } = req.body;

  if (!users.isValidUsername(username)) {
    console.log(username);
    res.status(400).json({ error: "required-username" });
    return;
  }

  if (username === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }

  const sid = sessions.addSession(username);
  if (!users.onlineUsers.includes(username)) {
    users.onlineUsers.push(username);
  }

  res.cookie("sid", sid);
  res.json({ username });
});

app.delete("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {
    sessions.deleteSession(sid);
  }
  if (!sessions.containsUser(username)) {
    users.onlineUsers = users.onlineUsers.filter((item) => item !== username);
  }

  res.json({ wasLoggedIn: !!username });
});

app.get("/api/chat", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const onlineUsers = users.onlineUsers || [];
  const chatHistory = users.chatHistory || [];

  res.json({ onlineUsers, chatHistory });
});

app.post("/api/chat", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const { message } = req.body;

  if (!message && message !== "") {
    res.status(400).json({ error: "required-message" });
    return;
  }

  if (!users.isValidMessage(message)) {
    res.status(400).json({ error: "invalid-message" });
    return;
  }

  users.chatHistory.push({ username, message });

  res.json({ username, message });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
