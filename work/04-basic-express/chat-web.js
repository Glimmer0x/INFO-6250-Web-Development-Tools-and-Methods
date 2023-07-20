const chatWeb = {
  chatPage: function (chat) {
    // Fill in/modify anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="chat.css">
        </head>
        <body>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function (chat) {
    return (
      `<ol class="messages">` +
      Object.values(chat.messages)
        .map(
          (message) => `
      <li>
        <div class="message">
          <div class="sender-info">
            <img class="avatar" alt="avatar of ${
              message.sender
            }" src="images/avatar-${message.sender.toLowerCase()}.jpg"/>
            <div class="username-container">
              <span class="username"><i>${message.sender}</i></span>
            </div>
            
          </div>
        <div class="message-text-container">
          <div class="said-text-container">
            <span><i>said:</i></span>
          </div>
          <p class="message-text">${message.text}</p>
          </div>
        </div>
      </li>
      `
        )
        .join("") +
      `</ol>`
    );
  },
  getUserList: function (chat) {
    return (
      `<ul class="users">
              <li>
                <div class="user">
                  <h3 class="users-title">Online Users</h3>
                </div>
              </li>
    ` +
      Object.values(chat.users)
        .map(
          (user) => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `
        )
        .join("") +
      `</ul>`
    );
  },
  getOutgoing: function () {
    return `
    <div class="outgoing">
      <form action="/chat" method="post">
        <div class="send-box">
          <input name="sendText" class="to-send" value="" placeholder="Enter message to send" />
          <button type="submit" class="send-button">Send</button>
        </div>
      </form>
    </div>
    `;
  },
};
module.exports = chatWeb;
