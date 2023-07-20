import './App.css';
import LoginModel from './LoginModel';
import MineModel from './MineModel';
import LoaderModel from './LoaderModel';
import { useEffect, useState } from 'react'
import {fetchSession} from './services'

function App() {

  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
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
  
  const explainError = (error) => {
    switch (error) {
      case 'auth-insufficient':
        return 'Invalid username or password';
      case 'auth-missing':
        return 'Please login to continue';
      case 'required-username':
        return 'Please input username to login';
      case 'Not a valid user':
        return 'Invalid username or password';
      default:
        return error;
    }
  }

  const displayError = (error) => { 
    return (
      <div className='error'>
        <p>{explainError(error)}</p>
      </div>
    )
  }

  return (
    <div className="App">
      
      {error ? displayError(error) : null}
      {loader ? <LoaderModel /> : null}
      {username ?
        <MineModel setError={setError} setUsername={setUsername}/> :
        <LoginModel setUsername={setUsername} setError={setError}  setLoader={ setLoader }/>}
    </div>
  );
}

export default App;
