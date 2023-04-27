import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style/Home.css';
import './Style/Common.css';

export default function Allservers() {

    const [server, setServer] = useState([]);
    const [serverloc, setServerloc] = useState([]);
    const [search, setSearch] = useState('');
    const [sortedField, setSortedField] = useState('serverlocationid');
    const [sortedField2, setSortedField2] = useState('gameserverid');

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    }


    useEffect(() => {
        searchData();
        fetchServerLocation();
    })

    const fetchServerLocation = () => {
        const sql = `select * from server_location ORDER BY ${sortedField}`;
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            .then(response => {
                setServerloc(response.data);
            })
            .catch(err => alert(err));
    }

    const searchData = () => {
        const sql = `select * from game_server where hostname like '%${search}%' ORDER BY ${sortedField2}`; // Use search state to construct the SQL query
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
    useEffect(() => {
        searchData();
        // eslint-disable-next-line
    }, [search, sortedField2]);
    useEffect(() => {
        fetchServerLocation();
        // eslint-disable-next-line
    }, [sortedField]);

    return (
        <main>
            <div className='title2'>
                <h1>All Servers</h1>
            </div>

            <div className="search-container">
                <form>
                    <input className='search-form' type="search" id="gsearch" name="gsearch" value={search} onChange={handleSearchChange} placeholder="Search server by hostname" />
                </form>
            </div>

            <div className='buttonflex'>
                <Link to={`create-server`} className='button'>
                    <button className='button-30'>Create new server</button>
                </Link>
            </div>

            <br />
            <button onClick={handleShow}>Show All Server Locations</button>
            <div className={show ? "server-item" : "hidden"}>
                <table className="serverloc-detail table-hover row-clickable">
                    <thead>
                        <tr>
                        <th onClick={() => setSortedField('serverlocationid')}>Server Location ID</th>
                        <th onClick={() => setSortedField('LOWER(region)')}>Region</th>
                        <th onClick={() => setSortedField('LOWER(colocation_country)')}>Colocation country</th>
                        <th onClick={() => setSortedField('LOWER(colocation_company)')}>Colocation company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serverloc.length > 0 ? (
                            serverloc.map(item => (
                                <tr key={item.serverlocationid}>
                                    <th><Link to={`/server-locations/${item.serverlocationid}`}>{item.serverlocationid}</Link></th>
                                    <th><Link to={`/server-locations/${item.serverlocationid}`}>{item.region}</Link></th>
                                    <th><Link to={`/server-locations/${item.serverlocationid}`}>{item.colocation_country}</Link></th>
                                    <th><Link to={`/server-locations/${item.serverlocationid}`}>{item.colocation_company}</Link></th>
                                </tr>
                            ))
                        ) : (
                            <p>Data Fetching...</p>
                        )}
                    </tbody>
                </table>
            </div>

            <table class="table table-hover row-clickable">
                <thead>
                    <tr>
                        <th onClick={() => setSortedField2('gameserverid')}>Server ID</th>
                        <th onClick={() => setSortedField2('gameid')}>Game ID</th>
                        <th onClick={() => setSortedField2('serverlocationid')}>Server Location ID</th>
                        <th onClick={() => setSortedField2('LOWER(ipaddress)')}>IP address</th>
                        <th onClick={() => setSortedField2('LOWER(hostname)')}>Hostname</th>
                        <th onClick={() => setSortedField2('port')}>Port</th>
                        <th onClick={() => setSortedField2('maxplayercount DESC')}>Max player count</th>
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
