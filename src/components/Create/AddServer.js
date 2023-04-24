import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function CreateServer() {
    const { slug } = useParams();
    const [serverloc, setServerloc] = useState([]);

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    }

    useEffect(() => {
        fetchServerLocation();
    }, [])

    const fetchServerLocation = () => {
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-serverlocation`)
            .then(response => {
                setServerloc(response.data);
            })
            .catch(err => alert(err));
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission

        // Collect input values
        const gameid = event.target.gameid.value;
        const serverlocationid = event.target.serverlocationid.value;
        const ipaddress = event.target.ipaddress.value;
        const hostname = event.target.hostname.value;
        const port = event.target.port.value;
        const maxplayercount = event.target.maxplayercount.value;

        // Display input values in an alert
        alert(`Data to create.\nGame ID: ${gameid}\nServer Location ID: ${serverlocationid}\nIP Address: ${ipaddress}\nHostname: ${hostname}\nPort: ${port}\nMax Playercount: ${maxplayercount}`);

        axios.post(`https://gamedb-api-service.up.railway.app/api/add-server`, { gameid: gameid, serverlocationid: serverlocationid, ipaddress: ipaddress, hostname: hostname, port: port, maxplayercount: maxplayercount })
            .then(response => {
                if (response.data['error']) {
                    alert(response.data.error); return;
                }
                alert("Create server successfully")
                window.location = `/game-detail/${slug}`;
            })
            .catch(error => alert(error));
    };



    return (
        <main>
            <h1>Create New Server</h1>
            <button onClick={handleShow}>Show All Server Locations</button>

            <div className={show ? "server-item" : "hidden"}>
                <table className="serverloc-detail table-hover row-clickable">
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

            <form onSubmit={handleSubmit}>
                <label htmlFor="hostname">Hostname: </label>
                <input type="text" id="hostname" name="hostname" required />

                <label htmlFor="gameid">Game ID: </label>
                <input type="text" id="gameid" name="gameid" defaultValue={slug} readOnly />

                <label htmlFor="serverlocationid">Server Location ID: </label>
                <input type="text" id="serverlocationid" name="serverlocationid" required />

                <label htmlFor="ipaddress">IP Address: </label>
                <input type="text" id="ipaddress" name="ipaddress" required />

                <label htmlFor="port">Port: </label>
                <input type="text" id="port" name="port" required />

                <label htmlFor="maxplayercount">Max player count: </label>
                <input type="text" id="maxplayercount" name="maxplayercount" required />

                <input type="submit" value="Submit" />
            </form>

            <Link to={`/game-detail/${slug}`}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
