const words = require('./words');

const historicalGuesses = {}

const currentGames = {};

const addNewGame = ({ username }) => {
    const availableWords = [...words];
    const wordIndex = Math.floor(Math.random() * availableWords.length);
    const answer = availableWords[wordIndex];
    availableWords.splice(wordIndex, 1);
    currentGames[username] = {guess: "", matches: 0, answer: answer, availableWords: availableWords, validGuesses: 0, message: "You are in a game!"};
    console.log(`username: ${username}, secret word: ${answer}`);
}

const getCurrentGame = ({username}) => { 
    return currentGames[username];
}

const getHistoricalGuesses = ({username}) => { 
    return historicalGuesses[username];
}

const isValidGuess = ({ guess }) => { 
    for (let word of words) { 
        if (word === guess) { return true; }
    }
    return false;
}

const isCorrectGuess = ({answer,  guess }) => { 
    return guess === answer;
}

const updateCurrentGame = ({ username, guess }) => { 
    const answer = currentGames[username]?.answer;
    if (!answer) { return; }
    if (!isValidGuess({ guess })) {
        currentGames[username].message = `${guess} is not a valid guess.`;
        return;
    }
    const isWin = isCorrectGuess({answer,  guess});
    const matches = isWin ? answer.length : compare(answer, guess);
    currentGames[username].matches = matches;
    currentGames[username].guess = guess;
    currentGames[username].message = isWin ? "You have won the game!" : "You are in a game!";
    if (historicalGuesses[username]) {
        historicalGuesses[username].push({guess, matches});
    }
    else {
        historicalGuesses[username] = [{guess, matches}];
    }
    currentGames[username].validGuesses += 1;
}

const hasWon = ({ username }) => { 
    const answer = currentGames[username]?.answer;
    const guess = currentGames[username]?.guess;
    return guess === answer;
}

const compare = (word, guess) => {
    let matches = 0;
    const letterCount = {};
    for (let letter of word.toLowerCase()) {
        letterCount[letter] = letterCount + 1 || 1;
    }
    for (let letter of guess.toLowerCase()) {
        if (letterCount[letter]) {
            letterCount[letter] -= 1;
            matches += 1;
         }
    }
    return matches;
}

const getAllWords = () => { 
    return words;
}

module.exports = {
    addNewGame,
    getCurrentGame,
    getHistoricalGuesses,
    isValidGuess,
    isCorrectGuess,
    updateCurrentGame,
    hasWon,
    getAllWords
};