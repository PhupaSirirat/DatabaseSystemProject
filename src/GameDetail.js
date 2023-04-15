import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Style/GameDetail.css';

const GameDetail = () => {
    const { slug } = useParams(); // Access the 'slug' parameter from the URL
    const [gameData, setGameData] = useState([]);

    const fetchData = () => {
        const sql = `select * from game where gameid=${slug}`
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            // if fetching successfully
            .then(response => {
                setGameData(response.data);
                
            })
            .catch(err => alert(err));
        console.log(gameData);
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteData = (e) => {
        e.preventDefault();
        const sql = `delete from game where gameid=${slug}`;
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            // if delete successfully
            .then(response => {
                alert("This game has been deleted successfully")
                window.location = "/";
            })
            .catch(error => alert(error));
    }

    return (
        <main>
            <h1>Game Detail Page: Game ID = {slug}</h1>

            <img height={"450px"} src={gameData[0] ? gameData[0].thumbnail_link  : <span>Fetch thumbnail...</span> } alt="fetch thumbnail..."/>
            <br/>

            <div className="game-item">
                {gameData.length > 0 ? (
                    // Render data if available
                    gameData.map(item => (
                        <div key={item.gameid}>
                            <p>Game: {item.gamename}</p>
                            <p>GameID: {item.gameid}</p>
                            <p>Genre: {item.genre}</p>
                            <p>Version: {item.version}</p>
                            <p>Description: {item.description}</p>
                            <p>Release Date: {item.releasedate.substring(0, item.releasedate.indexOf("T"))}</p>
                            <p>Systems: {item.systems}</p>
                            <p>Age Rating: {item.agerating}</p>
                        </div>
                    ))
                ) : (
                    // Render message if no data available
                    <p>Data Fetching...</p>
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

            <Link to={`/editgame/${slug}`}>
                <button className='nice_dark_butt_on'>Edit game details</button>
            </Link>
            <button className='nice_dark_butt_on' onClick={deleteData}>Delete this game</button>
            <Link to={"/"}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}

export default GameDetail;