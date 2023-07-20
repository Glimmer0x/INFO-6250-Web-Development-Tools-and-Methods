import './MineModel.css'
import DogeModel from './DogeModel';
import MineDashBoard from './MineDashBoard';
import { fetchBalance, fetchLogout } from './services'
import { useEffect, useState } from 'react'

const MineModel = ({ setError, setUsername}) => { 
    const [balance, setBalance] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {            
          fetchBalance()
              .catch((err) => {
                  setError(err.error)
                  return Promise.reject(err)
              })
              .then((res) => {
                  setBalance(res.balance)
              })
      }, 1000);
      return () => clearInterval(interval);
    });
    
    const logoutHandler = () => {
        fetchLogout()
            .catch((err) => {
                setError(err.error)
                return Promise.reject(err)
            })
            .then(() => {
                setUsername('')
            }
        )
    }


    return (
        <div className='mine-container'>
            <DogeModel setError={setError} balance={ balance } />
            <MineDashBoard setError={setError} />
            <button className='button-logout' onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default MineModel;