import axios from "axios";
import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const GameDetail = () => {
    const { slug } = useParams(); // Access the 'slug' parameter from the URL
    const [gameData, setGameData] = useState([]);

    const fetchData = () => {
        axios.get(`http://localhost:3001/api/get-data?table=game&field=gameid&value=${slug}`)
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
            <div>
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
        </main>
    )
}

export default GameDetail;