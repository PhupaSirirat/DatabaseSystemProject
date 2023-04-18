import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CreateServLoc() {
    const [input, setInput] = useState('');
    const handleInputChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
      }

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission

        // Collect input values
        const region = event.target.region.value;
        const colocation_country = event.target.colocation_country.value;
        const colocation_company = event.target.colocation_company.value;

        // Display input values in an alert
        alert(`Data to create.\nRegion: ${region}, Colocation Country: ${colocation_country}, Colocation Company: ${colocation_company}`);

        axios.post(`https://gamedb-api-service.up.railway.app/api/create-serverlocatiom`, {region:region, colocation_country:colocation_country, colocation_company:colocation_company})
            .then(response => {
                if (response.data['error']) {
                    alert(response.data.error); return;
                }
                alert("Create server location successfully")
                window.location = '/server-locations';
            })
            .catch(error => alert(error));
    };

    return (
        <main>
            <h1>Create Location {input.length>0? input: '[Untitled]'}</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="region">Region: </label>
                <input type="text" id="region" name="region" onChange={handleInputChange} required />

                <label htmlFor="colocation_country">Colocation Country: </label>
                <input type="text" id="colocation_country" name="colocation_country" required />

                <label htmlFor="colocation_company">Colocation Company: </label>
                <input type="text" id="colocation_company" name="colocation_company" required />

                <input type="submit" value="Submit" />
            </form>

            <Link to={"/server-locations"}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
