import './MineDashBoard.css';
import arrowIcon from './images/arrow.png';
import { useEffect, useState } from 'react';
import {fetchRank} from './services'

const MineDashBoard = ({setError}) => { 

    const [showRank, setShowRank] = useState(false)
    
    const mapPosition = (position) => { 
        switch (position) {
            case 1:
                return '🥇'
            case 2:
                return '🥈'
            case 3:
                return '🥉'
            default:
                return position
        }
    }

    const [rank, setRank] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
            fetchRank()
                .catch((err) => {
                    setError(err.error)
                    return Promise.reject(err)
                })
                .then((res) => {
                    setRank(res.rank)
                })            
        }, 1000);
        return () => clearInterval(interval);
    });


    return (
        <div className='mine-dashboard'>
            <div className='mine-rank'>
                <button className='button-open' onClick={() => { setShowRank(!showRank) }}>
                    <div className={showRank ? null : 'open'}>  
                        <img src={arrowIcon} alt="arrow icon" />
                    </div>
                </button>
                <div className={showRank ? 'show': 'hidden'}>
                <div className='rank-header'>
                    <div className='rank-logo'>🏆</div>
                    <div className='rank-title'>Click Power Rank</div>
                    </div>
                    <div className='rank-note'>
                        Rank of Average Clicks Per Second in the Last 10 Seconds
                    </div>
                <div className='rank-body'>
                    {
                        rank.map((item, index) => {
                            return (
                                <div className='rank-item' key={index}>
                                    <div className='rank-position'>{mapPosition(index + 1)}</div>
                                    <div className='rank-info'>
                                        <div className='rank-item-name'>{item.username}</div>
                                        <div className='rank-item-power'>{item.clicksPerSecond} CPS</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                
                </div>
                </div>                
            </div>
        </div>
    )

}

export default MineDashBoard;