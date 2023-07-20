const state = {
    isUsernameValid: true
};

const checkUsernameValid = (username) => {
    if (!username || username === 'dog') {
        state.isUsernameValid = false;
    }
    else { 
        const regex = /^[a-zA-Z0-9]+$/;
        state.isUsernameValid = (username.match(regex) != null);
    }
    return state.isUsernameValid;
};

const loginPage = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>login</title>
        <link rel="stylesheet" href="common.css">
        <link rel="stylesheet" href="login.css">
    </head>
    <body>
        <header>
            <h1>Log in</h1>
        </header>
        <main>
            <form action="/login" method="post">
                <fieldset>
    `
    + (state.isUsernameValid ? `` : `<p class="warn"><i>Please input a valid username!</i></p>` ) +
    `
                    
                    <legend>Log in</legend>
                    <div class="username-field-container">
                        <label for="username">Username:</label>
                        <input type="text" name="username" id="username" class="username-input">
                        <button class="login-button">Login</button>
                    </div>
                </fieldset>
            </form>
        </main>
        <footer>
            <p><i>We do not care about your privacy data!</i></p>
        </footer>
    </body>
    </html>
    `;
};

module.exports = {
    loginPage,
    checkUsernameValid
};