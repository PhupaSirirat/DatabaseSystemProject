import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style/Home.css';
import './Style/Common.css';

export default function Allservers() {

    const [server, setServer] = useState([]);
    const [serverloc, setServerloc] = useState([]);
    const [search, setSearch] = useState('');


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

    const searchData = () => {
        const sql = `select * from game_server where hostname like '%${search}%'`; // Use search state to construct the SQL query
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            .then(response => {
                if (response.data['error']) {
                    alert(response.data.error); return;
                }
                console.log('connected');
                setServer(response.data); // Update state with fetched data
            })
            .catch(err => alert(err));
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value); // Update search state with the input value
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        searchData(); // Call searchData function to fetch data based on search query
    }

    return (
        <main>
            <div className='title2'>
                <h1>All servers</h1>
            </div>

            <form onSubmit={handleSearchSubmit}>
                <label htmlFor="gsearch">Search Server Name:</label>
                <input type="search" id="gsearch" name="gsearch" value={search} onChange={handleSearchChange} />
                <button type="submit">Search</button> {/* Add a submit button to trigger search */}
            </form>

            <div className='buttonflex'>
                <Link to={`create-server`} className='button'>
                    <button className='nice_dark_butt_on'>Create new server</button>
                </Link>

                <Link to={`/`} className='button'>
                    <button className='nice_butt_on'>Home</button>
                </Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Server Location ID</th>
                        <th>Region</th>
                        <th>Colocation country</th>
                        <th>Colocation company</th>
                    </tr>
                </thead>
                <tbody>
                    {serverloc.length > 0 ? (
                        serverloc.map(item => (
                            <tr key={item.serverlocationid}>
                                <th><Link to={`${item.serverlocationid}`}>{item.serverlocationid}</Link></th>
                                <th><Link to={`${item.serverlocationid}`}>{item.region}</Link></th>
                                <th><Link to={`${item.serverlocationid}`}>{item.colocation_country}</Link></th>
                                <th><Link to={`${item.serverlocationid}`}>{item.colocation_company}</Link></th>
                            </tr>
                        ))
                    ) : (
                        <p>Data Fetching...</p>
                    )}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Server ID</th>
                        <th>Game ID</th>
                        <th>Server Location ID</th>
                        <th>IP address</th>
                        <th>Hostname</th>
                        <th>Port</th>
                        <th>Max player count</th>
                    </tr>
                </thead>
                <tbody>
                    {server.length > 0 ? (
                        // Render if server available
                        server.map(item => (

                            <tr key={item.gameserverid}>
                                <th><Link to={`/server-detail/${item.gameserverid}`}>
                                    {item.gameserverid}
                                </Link></th>
                                <th><Link to={`/server-detail/${item.gameserverid}`}>
                                    {item.gameid}
                                </Link></th>
                                <th><Link to={`/server-detail/${item.gameserverid}`}>
                                    {item.serverlocationid}
                                </Link></th>
                                <th><Link to={`/server-detail/${item.gameserverid}`}>
                                    {item.ipaddress}
                                </Link></th>
                                <th><Link to={`/server-detail/${item.gameserverid}`}>
                                    {item.hostname}
                                </Link></th>
                                <th><Link to={`/server-detail/${item.gameserverid}`}>
                                    {item.port}
                                </Link></th>
                                <th><Link to={`/server-detail/${item.gameserverid}`}>
                                    {item.maxplayercount}
                                </Link></th>
                            </tr>
                        ))
                    ) : (
                        // Render message if no data available
                        <p>Data Fetching...</p>
                    )}
                </tbody>
            </table>
        </main>
    )
}
