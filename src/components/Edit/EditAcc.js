import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function EditAcc() {

    // slug -> accountid
    const { slug } = useParams(); // Access the 'slug' parameter from the URL

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission

        // Collect input values
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        // Display input values in an alert
        alert(`Data to Update.\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`);

        const sql = `update account set username='${username}', email='${email}', password='${password}' where accountid='${slug}'`;
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            .then(Response => {
                if (response.error)
                {
                    alert(error); return;
                }
                alert("Update successfully")
                window.location = `/accounts`;
            })
            .catch(error => alert(error));
    };

    const fetchData = () => {
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-accountdetails?accountid=${slug}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => alert(error));
    }

    return (
        <main>
            <h1>Edit Game Page: Account ID = {slug}</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" defaultValue={data.length > 0 ? data[0].username: ""} required />
                <br />

                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email" defaultValue={data.length > 0 ? data[0].email: ""} required />
                <br />

                <label htmlFor="password">Password: </label>
                <input type="text" id="password" name="password" defaultValue={data.length > 0 ? data[0].password: ""} required />
                <br />

                <input type="submit" value="Submit" />
            </form>

            <Link to={`/accounts`}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
