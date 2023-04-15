import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function AccountDetail() {
    const { slug } = useParams();
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        fetchPlayer();
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

    return (
        <main>
            <h1>Account Detail: Account ID = {slug}</h1>

            <div className="game-item">
                {playerData.length > 0 ? (
                    // Render if server available
                    playerData.map(item => (
                        <div key={item.accountid}>
                            <p>Account ID: {item.accountid}</p>
                            <p>Username : {item.username}</p>
                            <p>Email : {item.email}</p>
                            <p>Password : {item.password}</p>
                            <p>Account Register Date : {item.accountregisterdate}</p>
                        </div>
                    ))
                ) : (
                    // Render message if no data available
                    <p>Data Fetching...</p>
                )}
            </div>

            <Link to={`/`}>
                <button className='nice_dark_butt_on'>Edit account details</button>
            </Link>

            <Link to={`/accounts`}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
