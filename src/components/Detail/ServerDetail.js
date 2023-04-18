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
                if (response.data['error'])
                {
                    alert(response.data.error); return;
                }
                alert("This server has been deleted successfully")
                window.location = "/allservers";
            })
            .catch(error => alert(error));
    }


    return (
        <main>
            <h1>Server {server.length>0? server[0].hostname: ''}</h1>

            {server.length > 0 ? (
                // Render if server available
                server.map(item => (
                    <div key={item.gameserverid} className="game-item">
                        <p className="bold">Server ID: {item.gameserverid}</p>
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
                            <p className="bold">Server Location ID: {item.serverlocationid}</p>
                            <p>Region: {item.region}</p>
                            <p>Colocation country: {item.colocation_country}</p>
                            <p>Colocation company: {item.colocation_company}</p>
                            
                        </div>
                    ))
                ) : (
                    <p>Data Fetching...</p>
                )}
            </div>

            <Link to={"edit-server"}>
                <button className='edit-btn'>Edit server details</button>
            </Link>
            <br/>
            <Link to={"/allserver"}>
                <button className='delete-btn' onClick={deleteServer}>Delete server</button>
            </Link>
            <br/>
            <Link to={`/game-detail/${server.length > 0 ? server[0].gameid : ""}`}>
                <button className='nice_butt_on'>To game page</button>
            </Link>
            <br/>
            <Link to={"/allservers"}>
                <button className='nice_butt_on'>All servers</button>
            </Link>
            <br/>
            <Link to={"/"}>
                <button className='nice_butt_on'>Home</button>
            </Link>
        </main>
    );
}
