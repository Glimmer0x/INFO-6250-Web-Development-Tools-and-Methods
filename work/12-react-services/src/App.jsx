import './App.css';
import LoginModel from './LoginModel';
import WordModel from './WordModel';
import LoaderModel from './LoaderModel';
import { useEffect, useState } from 'react'
import {fetchSession} from './services'

function App() {

  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    fetchSession()
      .then((res) => {
        setUsername(res.username)
      })
      .catch((err) => {
        setError(err.error)
      })

   }, [])

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
      {loader ? <LoaderModel /> : null}
      {username ?
        <WordModel setUsername={setUsername} setError={setError} setMessage={setMessage} setLoader={ setLoader } /> :
        <LoginModel setUsername={setUsername} setError={setError}  setLoader={ setLoader }/>}
    </div>
  );
}

export default App;
