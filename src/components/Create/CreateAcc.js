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
        // alert(`Data to insert.\nGame: ${gamename}\nGameID: ${gameid}\nGenre: ${genre}\nVersion: ${version}\nDescription: ${description}\nRelease Date: ${releasedate}\nSystems: ${systems}\nAge Rating: ${agerating}\nThumbnail Link: ${thumbnail}`);
    
        // const sql = `insert into game values (${gameid},'${gamename}','${description}','${releasedate}','${systems}','${version}','${genre}','${agerating}','${thumbnail}')`;
        // axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
        //   .then(Response => {
        //     alert("Insert successfully")
        //     window.location = '/';
        //   })
        //   .catch(error => alert(error));

      };


    return (
        <main>
            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>

                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" required />
                <br />

                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email" required />
                <br />

                <label htmlFor="password">Password: </label>
                <input type="text" id="password" name="password" required />
                <br />

                <input type="submit" value="Submit" />
            </form>

            <Link to={`/accounts`}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
