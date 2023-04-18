import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function PlayerDetail() {
    const { gameid, slug } = useParams();
    const [playerData, setPlayerData] = useState([]);
    const [mainAcc, setMainAcc] = useState([]);

    useEffect(() => {
        fetchPlayer();
        fetchMainAcc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchPlayer = () => {
        // const sql = `select * from game_server where gameid=${slug}`
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-playerdetails?gameaccountid=${slug}`)
            // if fetching game server successfully
            .then(response => {
                setPlayerData(response.data);
            })
            .catch(err => alert(err));
    }

    const fetchMainAcc = () => {
        // const sql = `select * from game_server where gameid=${slug}`
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-accountdetails?gameaccountid=${slug}`)
        // if fetching game server successfully
        .then(response => {
            setMainAcc(response.data);
        })
        .catch(err => alert(err));
    }

    const deletePlayer = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this game?")) {
            const sql = `delete from ingame_account where gameaccountid=${slug}`;
            axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
                // if delete successfully
                .then(response => {
                    if (response.data['error'])
                    {
                        alert(response.data.error); return;
                    }
                    alert("This player has been deleted successfully")
                    window.location = "/players";
                })
                .catch(error => alert(error));
        }
    }

    return (
        <main>
            <h1>{playerData.length>0? playerData[0].ingamename: ""}</h1>

            <div className="game-item">
                {playerData.length > 0 ? (
                    // Render if server available
                    playerData.map(item => (
                        <div key={item.gameaccountid}>
                            <p className='bold'>Game Account ID: {item.gameaccountid}</p>
                            <p>In game name: {item.ingamename}</p>
                            <p>In game register date: {item.ingameregisterdate.substring(0, item.ingameregisterdate.indexOf("T"))}</p>
                            <p>Account level: {item.accountlevel}</p>
                        </div>
                    ))
                ) : (
                    // Render message if no data available
                    <p>Data Fetching...</p>
                )}
            </div>

            <div className="game-item">
                {mainAcc.length > 0 ? (
                    // Render if server available
                    mainAcc.map(item => (
                        <div key={item.accountid}>
                            <Link to={`/accounts/account-detail/${item.accountid}`}><p className='bold'>Account ID: {item.accountid}</p></Link>
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

            <Link to={`/edit-player/${slug}`}>
                <button className='edit-btn'>Edit player details</button>
            </Link>
            <br/>
            <Link to={`/players`}>
                <button className='delete-btn' onClick={deletePlayer}>Delete player</button>
            </Link>
            <br/>
            <Link to={`/game-detail/${gameid}/top-player`}>
                <button className='nice_butt_on'>Top player</button>
            </Link>
            <br/>
            <Link to={`/players`}>
                <button className='nice_butt_on'>All player</button>
            </Link>
        </main>
    )
}
