import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function AccountDetail() {

    // slug -> accountid
    const { slug } = useParams();
    const [playerData, setPlayerData] = useState([]);
    const [playerGameAcc, setPlayerGameAcc] = useState([]);

    useEffect(() => {
        fetchPlayer();
        fetchInGameAcc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchPlayer = () => {
        // const sql = `select * from game_server where gameid=${slug}`
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-accountdetails?accountid=${slug}`)
            // if fetching game server successfully
            .then(response => {
                setPlayerData(response.data);
            })
            .catch(err => alert(err));
    }

    const fetchInGameAcc = () => {
        // const sql = `select * from game_server where gameid=${slug}`
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-playerlist?accountid=${slug}`)
            // if fetching game server successfully
            .then(response => {
                setPlayerGameAcc(response.data);
            })
            .catch(err => alert(err));
    }

    const deleteAccount = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this game?")) {
            const sql = `delete from account where accountid=${slug}`;
            axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
                // if delete successfully
                .then(response => {
                    if (response.data['error'])
                    {
                        alert(response.data.error); return;
                    }
                    alert("This account has been deleted successfully")
                    window.location = "/accounts";
                })
                .catch(error => alert(error));
        }
    }

    return (
        <main>
            <h1>{playerData.length>0? playerData[0].username: ''}</h1>

            <div className="game-item">
                {playerData.length > 0 ? (
                    // Render if server available
                    playerData.map(item => (
                        <div key={item.accountid}>
                            <p className='bold'>Account ID: {item.accountid}</p>
                            <p>Username : {item.username}</p>
                            <p>Email : {item.email}</p>
                            <p>Password : {item.password}</p>
                            <p>Account Register Date : {item.accountregisterdate.substring(0, item.accountregisterdate.indexOf("T"))}</p>
                        </div>
                    ))
                ) : (
                    // Render message if no data available
                    <p>Data Fetching...</p>
                )}
            </div>

            <div className="game-item">
                {playerGameAcc.length > 0 ? (
                    // Render if server available
                    playerGameAcc.map(item => (
                        <div key={item.accountid}>
                            <Link to={`/game-detail/${item.gameid}/player-detail/${item.gameaccountid}`}><p className='bold'>Game Account ID: {item.gameaccountid}</p></Link>
                            <p>Game ID: {item.gameid}</p>
                            <p>Game Server ID: {item.gameserverid}</p>
                            <p>In-game name: {item.ingamename}</p>
                            <p>Account level: {item.accountlevel}</p>
                            <p>Register Date: {item.ingameregisterdate.substring(0, item.ingameregisterdate.indexOf("T"))}</p>
                            <br/>
                        </div>
                    ))
                ) : (
                    // Render message if no data available
                    <p>Data Fetching...</p>
                )}
            </div>


            <Link to={`/edit-account/${slug}`}>
                <button className='edit-btn'>Edit account details</button>
            </Link>
            <br/>
            <Link to={`/accounts`} onClick={deleteAccount}>
                <button className='delete-btn'>Delete account</button>
            </Link>
            <br/>
            <Link to={`/accounts`}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
