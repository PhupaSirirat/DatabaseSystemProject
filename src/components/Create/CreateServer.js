import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CreateServer() {
    const [serverloc, setServerloc] = useState([]);

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

        axios.post(`https://gamedb-api-service.up.railway.app/api/add-server`, {gameid: gameid, serverlocationid:serverlocationid, ipaddress:ipaddress, hostname:hostname, port:port, maxplayercount:maxplayercount })
            .then(Response => {
                alert("Create server successfully")
                window.location = '/allservers';
            })
            .catch(error => alert(error));
    };



    return (
        <main>
            <h1>CreateServer</h1>

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
                <input type="text" id="gameid" name="gameid" required />
                <br />

                <label htmlFor="serverlocationid">Server Location ID: </label>
                <input type="text" id="serverlocationid" name="serverlocationid" required />
                <br />

                <label htmlFor="ipaddress">IP Address: </label>
                <input type="text" id="ipaddress" name="ipaddress" required />
                <br />

                <label htmlFor="hostname">Hostname: </label>
                <input type="text" id="hostname" name="hostname" required />
                <br />

                <label htmlFor="port">Port: </label>
                <input type="text" id="port" name="port" required />
                <br />

                <label htmlFor="maxplayercount">Max player count: </label>
                <input type="text" id="maxplayercount" name="maxplayercount" required />
                <br />

                <input type="submit" value="Submit" />
            </form>

            <Link to={`/allservers`}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
