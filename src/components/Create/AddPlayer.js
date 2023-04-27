import React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function CreatePlayer() {
    const { slug } = useParams();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission

        // Collect input values
        const accountid = event.target.accountid.value;
        const gameid = event.target.gameid.value;
        const gameserverid = event.target.gameserverid.value;
        const ingamename = event.target.ingamename.value;

        // Display input values in an alert
        alert(`Data to create.\nAccount ID: ${accountid}\nGame ID: ${gameid}\nGame Server ID: ${gameserverid}\nIn game name: ${ingamename}`);

        axios.post(`https://gamedb-api-service.up.railway.app/api/register-player`, { accountid: accountid, gameid: gameid, gameserverid: gameserverid, ingamename: ingamename })
            .then(response => {
                if (response.data['error']) {
                    alert(response.data.error); return;
                }

                alert("Create new player successfully")
                window.location = `/game-detail/${slug}`;
            })
            .catch(error => alert(error));
    };

    return (
        <main>
            <h1>Create New Player</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="accountid">Account ID: </label>
                <input type="text" id="accountid" name="accountid" required />

                <label htmlFor="gameid">Game ID: </label>
                <input type="text" id="gameid" name="gameid" defaultValue={slug} readOnly />

                <label htmlFor="gameserverid">Game Server ID: </label>
                <input type="text" id="gameserverid" name="gameserverid" required />

                <label htmlFor="ingamename">In game name: </label>
                <input type="text" id="ingamename" name="ingamename" required />

                <label htmlFor="accountlevel">Account Level: </label>
                <input type="text" id="accountlevel" name="accountlevel" defaultValue={1} readOnly />

                <input type="submit" value="Submit" />
            </form>

            <Link to={"/players"}>
                <button className='button-30'>All players</button>
            </Link>
            <Link to={`/game-detail/${slug}`}>
                <br />
                <button className='button-79'>Back</button>
            </Link>
            <br/>
        </main>
    )
}
