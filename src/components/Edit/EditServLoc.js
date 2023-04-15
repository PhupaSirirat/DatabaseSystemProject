import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function EditServLoc() {
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

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission

        // Collect input values
        const region = event.target.region.value;
        const colocation_country = event.target.colocation_country.value;
        const colocation_company = event.target.colocation_company.value;

        // Display input values in an alert
        alert(`Data to create.\nRegion: ${region}, Colocation Country: ${colocation_country}, Colocation Company: ${colocation_company}`);

        const sql = `update server_location set region='${region}', colocation_country='${colocation_country}', colocation_company='${colocation_company}' where serverlocationid=${slug}`
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            .then(Response => {
                alert("Update server location successfully")
                window.location = '/server-locations';
            })
            .catch(error => alert(error));
    };
    
    return (
        <main>
            <h1>Edit Server Location: ID = {slug}</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="region">Region: </label>
                <input type="text" id="region" name="region" defaultValue={serverloc.length > 0 ? serverloc[0].region : ""} required />
                <br />

                <label htmlFor="colocation_country">Colocation Country: </label>
                <input type="text" id="colocation_country" name="colocation_country" defaultValue={serverloc.length > 0 ? serverloc[0].colocation_country : ""} required />
                <br />

                <label htmlFor="colocation_company">Colocation Company: </label>
                <input type="text" id="colocation_company" name="colocation_company" defaultValue={serverloc.length > 0 ? serverloc[0].colocation_company : ""} required />

                <input type="submit" value="Submit" />
            </form>

            <Link to={"/server-locations"}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
