import './WordModel.css';
import { useEffect, useState } from 'react'
import {fetchLogout, fetchWord, fetchWordUpdate} from './services'

const WordModel = ({setUsername, setError, setMessage, setLoader}) => { 
    const [inputWord, setInputWord] = useState('')

    useEffect(() => { 
        setLoader(true)
        fetchWord()
            .catch((err) => {
                setError(err.error)
                return Promise.reject(err)
            })
            .then((res) => {
                setInputWord(res.storedWord)
            })
        setLoader(false)
    }, [])

    const checkWord = (callbackFunction) => {
        const regex = /^[a-zA-Z0-9]+$/;
        if (regex.test(inputWord)) {
            setError('');
            callbackFunction(inputWord);
        }
        else { 
            setError(`${inputWord}  was not a valid word`)
        }
    }

    const logoutClickHandler = () => {
        setLoader(true)
        fetchLogout()
            .catch((err) => {
                setError(err.error)
                return Promise.reject(err)
            })
            .then(() => {
                setError('');
                setMessage('');
                setUsername('');
            })
        setLoader(false)
    }

    const submitWordClickHandler = () => { 
        checkWord(() => {
            setLoader(true)
            fetchWordUpdate(inputWord)
                .catch((err) => {
                    setError(err.error)
                    return Promise.reject(err)
                })
                .then((res) => {
                    setError('');
                    setMessage(`Your stored work is ${inputWord}`);
                    setInputWord('');
                })
            setLoader(false)
        })
    }
        


    return (
        <div className='word-container'>
            <h1 className='title'>Stored Word</h1>
            <div className="forms-container">
                <div  className="word-field-container">
                    <label htmlFor="word">Input your word:</label>
                    <input
                        value={inputWord}
                        onChange={(e) => { 
                        setInputWord(e.target.value)
                    } } type="text" name="word" id="word" className="word-input" />
                    <button onClick={submitWordClickHandler} className="word-button">Submit</button>
                </div>
                <div className="logout-button-container">
                    <button onClick={logoutClickHandler} className="logout-button">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default WordModel;