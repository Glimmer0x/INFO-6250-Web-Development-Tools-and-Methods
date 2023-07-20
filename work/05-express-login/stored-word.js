const words = {};

const storedWord = ({username, word}) => {
    words[username] = {word};
};

const getWord = (username) => {
    return words[username]?.word;
};

module.exports = {
    storedWord,
    getWord
};

