import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ServerDetail() {

    // slug -> gameserverid
    const { slug } = useParams(); // Access the 'slug' parameter from the URL

    const [server, setServer] = useState([]);
    const [serverloc, setServerloc] = useState([]);


    useEffect(() => {
        fetchServers();
        fetchServerLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchServerLocation = () => {
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-serverlocationfromgameserverid?gameserverid=${slug}`)
            .then(response => {
                setServerloc(response.data);
            })
            .catch(err => alert(err));
    }

    const fetchServers = () => {
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-serverdetails?gameserverid=${slug}`)
            .then(response => {
                setServer(response.data);


            })
            .catch(err => alert(err));
    }

    const deleteServer = (e) => {
        e.preventDefault();
        const sql = `delete from game_server where gameserverid=${slug}`;
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            // if delete successfully
            .then(response => {
                alert("This server has been deleted successfully")
                window.location = "/allservers";
            })
            .catch(error => alert(error));
    }


    return (
        <main>
            <h1>Server Detail Page: Game Server ID = {slug}</h1>

            {server.length > 0 ? (
                // Render if server available
                server.map(item => (
                    <div key={item.gameserverid} className="game-item">
                        <p>Server ID: {item.gameserverid}</p>
                        <p>Game ID: {item.gameid}</p>
                        <p>IP address: {item.ipaddress}</p>
                        <p>Hostname: {item.hostname}</p>
                        <p>Port: {item.port}</p>
                        <p>Max player count: {item.maxplayercount}</p>
                    </div>
                ))
            ) : (
                // Render message if no data available
                <p>Data Fetching...</p>
            )}

            <div className="game-item">
                {serverloc.length > 0 ? (
                    serverloc.map(item => (
                        <div key={item.serverlocationid}>
                            <p>Server Location ID: {item.serverlocationid}<br />
                                Region: {item.region}<br />
                                Colocation country: {item.colocation_country}<br />
                                Colocation company: {item.colocation_company}<br />
                            </p>
                        </div>
                    ))
                ) : (
                    <p>Data Fetching...</p>
                )}
            </div>

            <Link to={"edit-server"}>
                <button className='nice_dark_butt_on'>Edit server details</button>
            </Link>
            <Link to={"/allserver"}>
                <button className='nice_dark_butt_on' onClick={deleteServer}>Delete server</button>
            </Link>
            <Link to={`/game-detail/${server.length > 0 ? server[0].gameid : ""}`}>
                <button className='nice_butt_on'>To game page</button>
            </Link>
            <Link to={"/allservers"}>
                <button className='nice_butt_on'>All servers</button>
            </Link>
            <Link to={"/"}>
                <button className='nice_butt_on'>Home</button>
            </Link>
        </main>
    );
}
