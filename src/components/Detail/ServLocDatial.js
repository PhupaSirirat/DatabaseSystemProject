import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ServLocDatial() {
    const { slug } = useParams();

    const [serverloc, setServerloc] = useState([]);
    useEffect(() => {
        fetchServerLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchServerLocation = () => {
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-serverlocation?serverlocationid=${slug}`)
            .then(response => {
                setServerloc(response.data);
            })
            .catch(err => alert(err));
    }

    const deleteServerLocation = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this game?")) {
            const sql = `delete from server_location where serverlocationid=${slug}`;
            axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
                // if delete successfully
                .then(response => {
                    if (response.data['error']) {
                        alert(response.data.error); return;
                    }
                    alert("This server location has been deleted successfully")
                    window.location = "/server-locations";
                })
                .catch(error => alert(error));
        }
    }

    return (
        <main>
            <h1>Server Location {serverloc.length > 0 ? serverloc[0].region : ''}</h1>

            <div>
                {serverloc.length > 0 ? (
                    serverloc.map(item => (
                        <div key={item.serverlocationid} className="game-item">
                            <p className="bold">Server Location ID: {item.serverlocationid}</p>
                            <p>Region: {item.region}</p>
                            <p>Colocation country: {item.colocation_country}</p>
                            <p>Colocation company: {item.colocation_company}</p>

                        </div>
                    ))
                ) : (
                    <p>No data.</p>
                )}
            </div>

            <Link to={`/edit-serverlocation/${slug}`}>
                <button className='edit-btn'>Edit location</button>
            </Link>
            <br />
            <Link to={"/server-locations"}>
                <button className='delete-btn' onClick={deleteServerLocation}>Delete location</button>
            </Link>
            <br />
            <Link to={"/server-locations"}>
                <button className='button-30'>All server locations</button>
            </Link>
            <br />
        </main>
    )
}
