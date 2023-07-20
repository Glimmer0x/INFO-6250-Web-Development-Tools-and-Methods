import './Word.css';
import { useState } from 'react'

const WordModal = ({setUsername, setError, setMessage }) => { 
    const [inputWord, setInputWord] = useState('')
    const answer = 'REACT'
    const compare = (word, guess) => { 
        const wordArray = word?.toLowerCase().split('');
        const guessArray = guess?.toLowerCase().split('');
        if (!wordArray || !guessArray) return 0;
        let count = 0;
        const countMap = {};
        for (let item of guessArray) {
            if (countMap[item]) {
            countMap[item] += 1;
            } else {
            countMap[item] = 1;
            }
        }
        for (let item of wordArray) {
            if (countMap[item]) {
            countMap[item] -= 1;
            count += 1;
            }
        }
        return count;
    }

    const checkWord = () => {
        if (inputWord.length === 5 && inputWord.match(/^[A-Za-z]*$/)) {
            const comparison = compare(answer, inputWord)
            if (comparison === 5) { 
                setError('');
                setMessage(`${inputWord} is the secret word!`);
            }
            else { 
                setError('');
                setMessage(`${inputWord} had ${comparison} letters in common`)
            }
        }
        else { 
            setError(`${inputWord}  was not a valid word`)
        }
    }

    return (
        <div className='word-container'>
            <h1 className='title'>Guess Word</h1>
            <div className="forms-container">
                <div  className="word-field-container">
                    <label htmlFor="word">Input your guess:</label>
                    <input
                        value={inputWord}
                        onChange={(e) => { 
                        setInputWord(e.target.value)
                    } } type="text" name="word" id="word" className="word-input" />
                    <button onClick={() => {
                        checkWord();
                        setInputWord('');
                    }} className="word-button">Submit</button>
                </div>
                <div className="logout-button-container">
                    <button onClick={() => { 
                        setError('');
                        setMessage('');
                        setUsername('');
                    }} className="logout-button">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default WordModal;