import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ServerLoc() {
    const [serverloc, setServerloc] = useState([]);
    const [search, setSearch] = useState('');
    const [sortedField, setSortedField] = useState('serverlocationid');

    useEffect(() => {
        searchData()
    })

    const searchData = () => {
        const sql = `select * from server_location where region like '${search}%' or colocation_country like '${search}%' or colocation_company like '${search}%' ORDER BY ${sortedField}`; // Use search state to construct the SQL query
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
    }, [search, sortedField]);

    return (
        <main>
            <div className='title2'>
                <h1>Server Locations</h1>
            </div>

            <div className="search-container">
                <form>
                    <input className='search-form' type="search" id="gsearch" name="gsearch" value={search} onChange={handleSearchChange} placeholder="Search Server Region or Country or Company" />
                </form>
            </div>

            <div className='buttonflex'>
                <Link to={"create-serverlocation"} className='button'>
                    <button className='button-30'>Create new location</button>
                </Link>
            </div>
            <table className="table table-hover row-clickable">
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
