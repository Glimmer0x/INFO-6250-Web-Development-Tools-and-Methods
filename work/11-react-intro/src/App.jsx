import './App.css';
import LoginModal from './Login';
import WordModal from './Word';
import { useState } from 'react'

function App() {

  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const displayError = () => { 
    return (
      <div className='error'>
        <p>{error}</p>
      </div>
    )
  }

  const displayMessage = () => { 
    return (
      <div className='message'>
        <p>{message}</p>
      </div>
    )
  }

  return (
    <div className="App">
      
      {error ? displayError() : null}
      {message ? displayMessage() : null}
      {username ?
        <WordModal setUsername={setUsername} setError={setError} setMessage={ setMessage}/> :
        <LoginModal setUsername={setUsername} setError={setError}  />}
    </div>
  );
}

export default App;
