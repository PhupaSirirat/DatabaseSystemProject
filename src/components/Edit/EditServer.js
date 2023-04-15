import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function EditServer() {
    const { slug } = useParams();
    const [server, setServer] = useState([]);
    const [serverloc, setServerloc] = useState([]);

    useEffect(() => {
        fetchServer();
        fetchServerLocation();
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
                alert("Update server successfully")
                window.location = '/allservers';
            })
            .catch(error => alert(error));
    };

    return (
        <main>
            <h1>EditServer: Game Server ID: {slug}</h1>

            <div className="game-item">
                {serverloc.length > 0 ? (
                    serverloc.map(item => (
                        <div key={item.serverlocationid}>
                            <p>Server Location ID: {item.serverlocationid}<br/> 
                                Region: {item.region}<br/> 
                                Colocation country: {item.colocation_country}<br/>
                                Colocation company: {item.colocation_company}<br/>
                            </p>
                            <br/>
                        </div>
                    ))
                ) : (
                    <p>Data Fetching...</p>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="gameid">Game ID: </label>
                <input type="text" id="gameid" name="gameid" defaultValue={server.length>0?server[0].gameid:""} required />
                <br />

                <label htmlFor="serverlocationid">Server Location ID: </label>
                <input type="text" id="serverlocationid" name="serverlocationid" defaultValue={server.length>0?server[0].serverlocationid:""}  required />
                <br />

                <label htmlFor="ipaddress">IP Address: </label>
                <input type="text" id="ipaddress" name="ipaddress" defaultValue={server.length>0?server[0].ipaddress:""}  required />
                <br />

                <label htmlFor="hostname">Hostname: </label>
                <input type="text" id="hostname" name="hostname" defaultValue={server.length>0?server[0].hostname:""}  required />
                <br />

                <label htmlFor="port">Port: </label>
                <input type="text" id="port" name="port" defaultValue={server.length>0?server[0].port:""} required />
                <br />

                <label htmlFor="maxplayercount">Max player count: </label>
                <input type="text" id="maxplayercount" name="maxplayercount" defaultValue={server.length>0?server[0].maxplayercount:""}  required />
                <br />

                <input type="submit" value="Submit" />
            </form>

            <Link to={`/server-detail/${slug}`}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
