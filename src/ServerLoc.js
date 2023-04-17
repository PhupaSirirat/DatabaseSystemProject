import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ServerLoc() {
    const [serverloc, setServerloc] = useState([]);
    useEffect(() => {
        fetchServerLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
                <h1>Server Locations</h1>
            </div>
            <div className='buttonflex'>
                <Link to={"create-serverlocation"} className='button'>
                    <button className='nice_dark_butt_on'>Create new location</button>
                </Link>

                <Link to={"/"} className='button'>
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
        </main>
    )
}
