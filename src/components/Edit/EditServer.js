import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function EditServer() {
    const { slug } = useParams();
    const [server, setServer] = useState([]);
    const [serverloc, setServerloc] = useState([]);

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    }

    useEffect(() => {
        fetchServer();
        fetchServerLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchServer = () => {
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-serverdetails?gameserverid=${slug}`)
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

        const sql = `update game_server set gameid='${gameid}', serverlocationid='${serverlocationid}', ipaddress='${ipaddress}', hostname='${hostname}', port='${port}', maxplayercount='${maxplayercount}' where gameserverid='${slug}'`;
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            .then(response => {
                if (response.data['error']) {
                    alert(response.data.error); return;
                }
                alert("Update server successfully")
                window.location = '/allservers';
            })
            .catch(error => alert(error));
    };

    return (
        <main>
            <h1>Edit Server {server.length > 0 ? server[0].hostname : ''}</h1>
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
                <label htmlFor="gameid">Game ID: </label>
                <input type="text" id="gameid" name="gameid" defaultValue={server.length > 0 ? server[0].gameid : ""} required />

                <label htmlFor="serverlocationid">Server Location ID: </label>
                <input type="text" id="serverlocationid" name="serverlocationid" defaultValue={server.length > 0 ? server[0].serverlocationid : ""} required />

                <label htmlFor="ipaddress">IP Address: </label>
                <input type="text" id="ipaddress" name="ipaddress" defaultValue={server.length > 0 ? server[0].ipaddress : ""} required />

                <label htmlFor="hostname">Hostname: </label>
                <input type="text" id="hostname" name="hostname" defaultValue={server.length > 0 ? server[0].hostname : ""} required />

                <label htmlFor="port">Port: </label>
                <input type="text" id="port" name="port" defaultValue={server.length > 0 ? server[0].port : ""} required />

                <label htmlFor="maxplayercount">Max player count: </label>
                <input type="text" id="maxplayercount" name="maxplayercount" defaultValue={server.length > 0 ? server[0].maxplayercount : ""} required />

                <input type="submit" value="Submit" />
            </form>

            <Link to={`/server-detail/${slug}`}>
                <button className='button-79'>Back</button>
            </Link>
        </main>
    )
}
