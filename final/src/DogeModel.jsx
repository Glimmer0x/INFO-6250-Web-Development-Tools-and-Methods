import React from 'react';
import './DogeModel.css';
import shiaLogo from './images/shia.png';
import dogeLogo from './images/dogcoin.png';
import { useEffect, useState } from 'react';
import {fetchRankUpdate} from './services'

const DogeModel = ({setError, balance}) => { 
    
    const [click, setClick] = useState(0)
    const [lastClick, setLastClick] = useState(0)
    const [lastClickTime, setLastClickTime] = useState(0)
    const [cps, setCps] = useState(0)

    const timer = new Date();

    const uploadClick = (click) => { 
        fetchRankUpdate(click)
            .catch((err) => {
                setError(err.error)
                return Promise.reject(err)
            })
    }

    const clickHandler = () => { 
        if (click === 0) { 
            setLastClickTime(timer.getTime());
        }
        else {
            if (timer.getTime() - lastClickTime > 1000) {
                setCps((click - lastClick) / ((timer.getTime() - lastClickTime) / 1000));
                uploadClick(click - lastClick);
                setLastClick(click)
                setLastClickTime(timer.getTime());
            }
        }
        setClick(click + 1);
        
    }

    useEffect(() => {
        if (cps !== 0) { 
            const interval = setInterval(() => {
                if (click === lastClick) {
                    uploadClick(click - lastClick);
                    setCps(0);
                }
                else { 
                    uploadClick(click - lastClick);
                    setLastClick(click);      
                }

            }, 1000);
            return () => clearInterval(interval);
        }

    }, [click, lastClick])

    return (
        <div className='logo-container'>
            <div className='balance-container'>
                <span>Your Balance {balance.toFixed(2)} </span> 
                <img className='balance-logo' src={ dogeLogo } alt="Doge Coin Logo" />
            </div>
            <div className="centerbutton">
                <button className="bubbly-button" onClick={clickHandler}>
                    { cps === 0 ? 'Click to mining' : cps.toFixed(2) + ` CPS` }
                </button>
            </div>
            <img src={shiaLogo} className="centerdoge" alt="shia coin logo" />
            <span className='mine-explain'>More clicks you did at last 10 seconds, more Doge Coins you can get!</span>
        </div>
    )
}

export default DogeModel;