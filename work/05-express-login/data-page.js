const dataPage = ({ username, word }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Data Page</title>
        <link rel="stylesheet" href="common.css">
        <link rel="stylesheet" href="data-page.css">
    </head>
    <body>
        <header>
            <h1>Data page</h1>
        </header>
        <main>
            <p>Hi, ${username}, your last stored word is "${word}"</p>
            <div class="forms-container">
                <form action="/change-word" method="post" class="word-field-container">
                    <label for="word">Change the stored word:</label>
                    <input type="text" name="word" id="word" class="word-input">
                    <button class="word-button">Submit</button>
                </form>
                <form action="/logout" method="post" class="logout-button-container">
                    <button class="logout-button">Logout</button>
                </form>
            </div>
        </main>
        <footer>
            <p><i>We do not care about your privacy data!</i></p>
        </footer>
    </body>
    </html>
    `;
};

module.exports = {
    dataPage
};