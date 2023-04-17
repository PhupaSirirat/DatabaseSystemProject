import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style/Home.css';
import './Style/Common.css';

export default function Allservers() {

    const [server, setServer] = useState([]);
    const [serverloc, setServerloc] = useState([]);

    useEffect(() => {
        fetchServers();
        fetchServerLocation();
    }, [])
    const fetchServers = () => {
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-serverlist`)
            .then(response => {
                setServer(response.data);
            })
            .catch(err => alert(err));
    }
    const fetchServerLocation = () => {
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-serverlocation`)
            .then(response => {
                setServerloc(response.data);
            })
            .catch(err => alert(err));
    }

    return (
        <main>
            <div className='title2'>
                <h1>All servers</h1>
            </div>
            <div className='buttonflex'>
                <Link to={`create-server`} className='button'>
                    <button className='nice_dark_butt_on'>Create new server</button>
                </Link>

                <Link to={`/`} className='button'>
                    <button className='nice_butt_on'>Home</button>
                </Link>
            </div>
            <div className="game-item">
                {serverloc.length > 0 ? (
                    serverloc.map(item => (
                        <div key={item.serverlocationid}>
                            <p>Server Location ID: {item.serverlocationid}<br />
                                Region: {item.region}<br />
                                Colocation country: {item.colocation_country}<br />
                                Colocation company: {item.colocation_company}<br />
                            </p>
                            <br />
                        </div>
                    ))
                ) : (
                    <p>Data Fetching...</p>
                )}
            </div>
            <div className='resultcontain'>
                {server.length > 0 ? (
                    // Render if server available
                    server.map(item => (
                        <Link to={`/server-detail/${item.gameserverid}`}>
                            <div key={item.gameserverid} className="game-item">
                                <p>Server ID: {item.gameserverid}</p>
                                <p>Game ID: {item.gameid}</p>
                                <p>Server Location ID: {item.serverlocationid}</p>
                                <p>IP address: {item.ipaddress}</p>
                                <p>Hostname: {item.hostname}</p>
                                <p>Port: {item.port}</p>
                                <p>Max player count: {item.maxplayercount}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    // Render message if no data available
                    <p>Data Fetching...</p>
                )}
            </div>
        </main>
    )
}
