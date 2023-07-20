import './LoginModel.css'
import { useState } from 'react'
import {fetchLogin} from './services'

const LoginModel = ({ setUsername, setError, setLoader}) => { 
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
    const loginClickHandler = () => { 
        checkUsername(inputUsername, () => {
            setLoader(true)
            fetchLogin(inputUsername)
                .catch((err) => {
                    setError(err.error)
                    return Promise.reject(err)
                })
                .then((res) => {
                    setUsername(res.username)
                })
            setLoader(false)
        })
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
                <button onClick={loginClickHandler} className="login-button">Login</button>
            </div>
        </div>
    )
}

export default LoginModel