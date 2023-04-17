import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ServerLoc() {
    const [serverloc, setServerloc] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchServerLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const fetchServerLocation = () => {
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-serverlocation`)
            .then(response => {
                if (response.data['error']) {
                    alert(response.data.error); return;
                }
                setServerloc(response.data);
            })
            .catch(err => alert(err));
    }

    const searchData = () => {
        const sql = `select * from server_location where region like '${search}%' or colocation_country like '${search}%' or colocation_company like '${search}%'`; // Use search state to construct the SQL query
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            .then(response => {
                if (response.data['error']) {
                    alert(response.data.error); return;
                }
                console.log('connected');
                setServerloc(response.data); // Update state with fetched data
            })
            .catch(err => alert(err));
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value); // Update search state with the input value
    }
    useEffect(() => {
        searchData();
        // eslint-disable-next-line
    }, [search]);

    return (
        <main>
            <div className='title2'>
                <h1>Server Locations</h1>
            </div>

            <div className="search-container">
                <form>
                    <input type="search" id="gsearch" name="gsearch" value={search} onChange={handleSearchChange} placeholder="Search Server Region or Country or Company" />
                </form>
            </div>

            <div className='buttonflex'>
                <Link to={"create-serverlocation"} className='button'>
                    <button className='nice_butt_on'>Create new location</button>
                </Link>

                <Link to={"/"} className='button'>
                    <button className='nice_butt_on'>Home</button>
                </Link>
            </div>
            <table className="table table-hover row-clickable">
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
        </main>
    )
}
