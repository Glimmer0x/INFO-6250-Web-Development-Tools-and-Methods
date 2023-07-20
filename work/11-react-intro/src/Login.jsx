import './Login.css'
import { useState } from 'react'

const LoginModal = ({ setUsername, setError}) => { 
    const [inputUsername, setInputUsername] = useState('')
    const checkUsername = (username, callbackFunction) => {
        if (!username) {
            setError('Please enter a username')
        }
        else if(username === 'dog'){
            setError('Not a valid user')
        }
        else if(!username.match(/^[A-Za-z0-9_]+$/) ){
            setError('The input username is not made up of valid characters') 
        }
        else {
            setError('')
            callbackFunction(username)
        }
    }
    return (
        <div>
            <h1 className='title'>Login</h1>
            <div className='login-container'>
                <label htmlFor="username">Username: </label>
                <input value={inputUsername} onChange={(e) => {
                    checkUsername(e.target.value, () => { })
                    setInputUsername(e.target.value)
                }} type="text" className="username-input" />
                <button onClick={() => { checkUsername(inputUsername, setUsername) }} className="login-button">Login</button>
            </div>
        </div>
    )
}

export default LoginModal