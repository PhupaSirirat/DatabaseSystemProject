import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../../Style/Detail.css';

const GameDetail = () => {
    const { slug } = useParams(); // Access the 'slug' parameter from the URL

    const [gameData, setGameData] = useState([]);
    const [serverData, setServerData] = useState([]);
    const [playerData, setPlayerData] = useState([]);

    const fetchData = () => {
        const sql = `select * from game where gameid=${slug}`
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            // if fetching successfully
            .then(response => {
                setGameData(response.data);
            })
            .catch(err => alert(err));
    }

    const fetchServerData = () => {
        // const sql = `select * from game_server where gameid=${slug}`
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-serverlist?gameid=${slug}`)
            // if fetching game server successfully
            .then(response => {
                setServerData(response.data);
            })
            .catch(err => alert(err));
    }

    const fetchPlayer = () => {
        // const sql = `select * from game_server where gameid=${slug}`
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-topplayer?gameid=${slug}&count=5`)
            // if fetching game server successfully
            .then(response => {
                setPlayerData(response.data);
            })
            .catch(err => alert(err));
    }

    useEffect(() => {
        fetchData();
        fetchServerData();
        fetchPlayer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const deleteData = (e) => {
        e.preventDefault();
        const sql = `delete from game where gameid=${slug}`;
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            // if delete successfully
            .then(response => {
                if (response.data['error'])
                {
                    alert(response.data.error); return;
                }
                alert("This game has been deleted successfully")
                window.location = "/";
            })
            .catch(error => alert(error));
    }

    return (
        <main>
            <h1>{gameData[0] ? gameData[0].gamename : ""}</h1>

            <img className="game-img" height={"450px"} src={gameData[0] ? gameData[0].thumbnail_link : <span>Fetch thumbnail...</span>} alt="fetch thumbnail..." />
            <br />

            <div className="game-item">
                {gameData.length > 0 ? (
                    // Render data if available
                    gameData.map(item => (
                        <div key={item.gameid}>
                            <p className="bold">Game: {item.gamename}</p>
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
                <p className="bold">Game Server(s)</p>
                {serverData.length > 0 ? (
                    // Render if server available
                    serverData.map(item => (
                        <div key={item.gameserverid}>
                            <p>Server: &nbsp;
                                <Link to={`/server-detail/${item.gameserverid}`}>{item.hostname}</Link>
                            </p>
                        </div>
                    ))
                ) : (
                    // Render message if no data available
                    <p>Data Fetching...</p>
                )}
            </div>

            {/* Top 5 players of this game */}
            <div className="game-item">

                <Link to={`top-player`}>
                    <p className="bold">Top Player(s)</p>
                </Link>

                {playerData.length > 0 ? (
                    // Render if server available
                    playerData.map(item => (
                        <div key={item.gameaccountid}>
                            <p>{item.ingamename} : {item.accountlevel}</p>
                        </div>
                    ))
                ) : (
                    // Render message if no data available
                    <p>Data Fetching...</p>
                )}
            </div>

            <Link to={`/editgame/${slug}`}>
                <button className='edit-btn'>Edit game details</button>
            </Link>
            <br />
            <button className='delete-btn' onClick={deleteData}>Delete this game</button>
            <br />
            <Link to={"/App"}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}

export default GameDetail;