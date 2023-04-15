import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Style/GameDetail.css';

const GameDetail = () => {
    const { slug } = useParams(); // Access the 'slug' parameter from the URL
    const [gameData, setGameData] = useState([]);

    const fetchData = () => {
        axios.get(`http://gamedb-api-service.up.railway.app/api/query?sql=select+*+from+game+where+gameid-${slug}`)
            // if fetching successfully
            .then(response => {
                setGameData(response.data);
            })
            .catch(err => alert(err));
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main>
            <h1>Game Detail Page: game_id = {slug}</h1>
            <div className="game-item">
                {gameData.length > 0 ? (
                    // Render data if available
                    gameData.map(item => (
                        <div key={item.gameid}>
                            <p>Game: {item.gamename}</p>
                            <p>GameID: {item.gameid}</p>
                            <p>Genre: {item.genre}</p>
                            <p>Version: {item.version}</p>
                            <p>Desc: {item.description}</p>
                            <p>Release Date: {item.releasedate}</p>
                            <p>Systems: {item.systems}</p>
                        </div>
                    ))
                ) : (
                    // Render message if no data available
                    <p>Fetching data...</p>
                )}
            </div>

            {/* All server available for this game */}
            <div className="game-item">
                <p>Game Server</p>
                <p>Server ID: 1 (demo)</p>
                <p>Server ID: 2 (demo)</p>
                <p>Server ID: 3 (demo)</p>
            </div>

            {/* All players who play this game */}
            <div className="game-item">
                <p>Player</p>
                <p>Player ID: 1 (demo)</p>
                <p>Player ID: 2 (demo)</p>
                <p>Player ID: 3 (demo)</p>
            </div>

            <button className='nice_dark_butt_on'>Delete this game</button>
            <Link to={"/"}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}

export default GameDetail;