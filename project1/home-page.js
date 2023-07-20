const getPossibleList = ({availableWords, allWords}) => { 
    if (availableWords) { 
        return splitWordList(availableWords).map(word => `<li>${word}</li>`).join('');
    }

    return splitWordList(allWords).map(word => `<li>${word}</li>`).join('')
}

const splitWordList = (words) => { 
    const wordsList = [...words];
    const size = 4;
    const itemOfArrays = [];
    for (let i=0; i<size*20; i+=size) {
        itemOfArrays.push(wordsList.slice(i, i + size).join(" "));
    }
    return itemOfArrays;
}

const getHistoricalList = ({ historicalGames }) => { 
    if (historicalGames) { 
        return historicalGames.map(game => `<li class="hitorical-item"><span>${game.guess}</span><span>${game.matches}</span></li>`).join('');
    }
    return ``;
}

const getGuessButton = ({ currentGame }) => { 
    if (currentGame) { 
        if (currentGame.guess === currentGame.answer) { 
            return ``;
        }
        return `<form action="/guess" method="post" class="word-field-container">
                            <label for="word">Make a new guess:</label>
                            <input type="text" name="word" id="word" class="word-input">
                            <button class="word-button">Submit</button>
                        </form>`;
    }
    return ``;
}

const homePage = ({ currentGame, historicalGames, allWords }) => {
    const message = currentGame?.message || "You are not in a game.";
    const availableWords = currentGame?.availableWords;
    
    return `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Game Page</title>
        <link rel="stylesheet" href="common.css">
        <link rel="stylesheet" href="home.css">
    </head>
        <body>
            <header>
                <h1>Word Game</h1>
            </header>
            <main>
                <div class="block-possible-words">
                    <ul class="list-possible-words">
                        <li class="list-title">Available words:</li>`
        +
        getPossibleList({availableWords, allWords})
        +

                    `</ul>

                </div>
                <div class="block-game-panel">
                    <span class="data-message">
                        ${message}
                    </span>
                    <div class="panel-data">
                        <div class="data-count-valid-guesses"> 
                            <span> Count of valid guesses: </span>
                            <span> ${currentGame?.validGuesses || ""} </span>
                        </div>
                        <div class="data-recent-valid-guess">
                            <span> Recent valid guess: </span>
                            <span> ${currentGame?.guess || ""} </span>
                        </div>
                        <div class="data-matched-letters">
                            <span> Matched letters: </span>
                            <span> ${currentGame?.matches || ""} </span>
                        </div>
                    </div>

                    <div class="panel-operations">`
        +
        getGuessButton({ currentGame })
        +
                    `
                        <div class="forms-container">
                            <form action="/new-game" method="post" class="new-game-button-container">
                                <button class="new-game-button">New Game</button>
                            </form>
                            <form action="/logout" method="post" class="logout-button-container">
                                <button class="logout-button">Logout</button>
                            </form>
                        </div>
                    </div>

                </div>
                <div class="block-historical-guesses">
                    <ul class="list-historical-guesses">
                        <li class="list-title">Historical guesses:</li>
                        <li class="hitorical-item">
                            <span>Words</span>
                            <span>Matched letters</span>
                        </li>`
        +
        getHistoricalList({ historicalGames })
        +
    
                    `</ul>
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
    homePage
};