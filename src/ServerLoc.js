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
            <div className='resultcontain'>
                {serverloc.length > 0 ? (
                    serverloc.map(item => (
                        <Link to={`${item.serverlocationid}`}>
                            <div key={item.serverlocationid} className="game-item">
                                <p>Server Location ID: {item.serverlocationid}<br />
                                    Region: {item.region}<br />
                                    Colocation country: {item.colocation_country}<br />
                                    Colocation company: {item.colocation_company}<br />
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Data Fetching...</p>
                )}
            </div>
        </main>
    )
}
