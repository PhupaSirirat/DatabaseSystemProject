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
         const sql = `delete from server_location where serverlocationid=${slug}`;
         axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
             // if delete successfully
             .then(response => {
                if (response.data['error'])
                {
                    alert(response.data.error); return;
                }
                 alert("This server location has been deleted successfully")
                 window.location = "/server-locations";
             })
             .catch(error => alert(error));
     }

    return (
        <main>
            <h1>Server Location Datials: ID = {slug}</h1>

            <div>
                {serverloc.length > 0 ? (
                    serverloc.map(item => (
                        <div key={item.serverlocationid} className="game-item">
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

            <Link to={`/edit-serverlocation/${slug}`}>
                <button className='nice_dark_butt_on'>Edit location</button>
            </Link>
            <Link to={"/server-locations"}>
                <button className='nice_dark_butt_on' onClick={deleteServerLocation}>Delete location</button>
            </Link>

            <Link to={"/server-locations"}>
                <button className='nice_butt_on'>All server locations</button>
            </Link>
            <Link to={"/"}>
                <button className='nice_butt_on'>Home</button>
            </Link>
        </main>
    )
}
