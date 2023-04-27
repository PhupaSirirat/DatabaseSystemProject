import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function TopPlayer() {
    const { slug } = useParams();
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        fetchPlayer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchPlayer = () => {
        // const sql = `select * from game_server where gameid=${slug}`
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-topplayer?gameid=${slug}`)
            // if fetching game server successfully
            .then(response => {
                setPlayerData(response.data);
            })
            .catch(err => alert(err));
    }

    return (
        <main>
            <h1>TopPlayer: Game ID = {slug}</h1>

            <div className="game-item">
                <p className="bold">Top Player(s)</p>

                {playerData.length > 0 ? (
                    // Render if server available
                    playerData.map(item => (
                        <Link to={`/game-detail/${slug}/player-detail/${item.gameaccountid}`}>
                            <div key={item.gameaccountid}>
                                <p>{item.ingamename} : {item.accountlevel}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    // Render message if no data available
                    <p>Data Fetching...</p>
                )}
            </div>

            <Link to={`/game-detail/${slug}`}>
                <button className='button-79'>Back</button>
            </Link>
        </main>
    )
}
