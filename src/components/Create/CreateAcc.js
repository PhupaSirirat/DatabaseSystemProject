import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CreateAcc() {

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission

        // Collect input values
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        // Display input values in an alert
        alert(`Data to create.\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`);

        axios.post(`https://gamedb-api-service.up.railway.app/api/register-account`, { username: username, email: email, password: password })
            .then(response => {
                if (response.data['error']) {
                    alert(response.data.error); return;
                }
                alert("Create account successfully")
                window.location = '/accounts';
            })
            .catch(error => alert(error));
    };


    return (
        <main>
            <h1>Create New Account</h1>

            <form onSubmit={handleSubmit}>

                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email" required />

                <label htmlFor="password">Password: </label>
                <input type="text" id="password" name="password" required />

                <input type="submit" value="Submit" />
            </form>

            <Link to={`/accounts`}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
