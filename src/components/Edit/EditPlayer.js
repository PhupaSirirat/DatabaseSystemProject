import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditPlayer() {
    const { slug } = useParams();
    const [players, setPlayers] = useState([]);
    const [input, setInput] = useState('');
    const handleInputChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    useEffect(() => {
        fetchPlayers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const fetchPlayers = () => {
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-playerdetails?gameaccountid=${slug}`)
            .then(response => {
                setPlayers(response.data); // Update state with fetched data
            })
            .catch(err => alert(err));
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission

        // Collect input values
        const accountid = event.target.accountid.value;
        const gameid = event.target.gameid.value;
        const gameserverid = event.target.gameserverid.value;
        const ingamename = event.target.ingamename.value;
        const accountlevel = event.target.accountlevel.value;

        // Display input values in an alert
        alert(`Data to create.\nAccount ID: ${accountid}\nGame ID: ${gameid}\nGame Server ID: ${gameserverid}\nIn game name: ${ingamename}\nAccount Level: ${accountlevel}`);

        const sql = `update ingame_account set accountid='${accountid}', gameserverid='${gameserverid}', gameid='${gameid}', ingamename='${ingamename}', accountlevel='${accountlevel}' where gameaccountid='${slug}'`;
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            .then(response => {
                if (response.data['error']) {
                    alert(response.data.error); return;
                }
                alert("Update successfully")
                window.location = `/players`;
            })
            .catch(error => alert(error));
    };

    return (
        <main>
            <h1>Edit Player {input.length > 0 ? input : (players.length > 0 ? players[0].ingamename : "")}</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="accountid">Account ID: </label>
                <input type="text" id="accountid" name="accountid" defaultValue={players.length > 0 ? players[0].accountid : ""} required />

                <label htmlFor="gameid">Game ID: </label>
                <input type="text" id="gameid" name="gameid" defaultValue={players.length > 0 ? players[0].gameid : ""} required />

                <label htmlFor="gameserverid">Game Server ID: </label>
                <input type="text" id="gameserverid" name="gameserverid" defaultValue={players.length > 0 ? players[0].gameserverid : ""} required />

                <label htmlFor="ingamename">In game name: </label>
                <input type="text" id="ingamename" name="ingamename" onChange={handleInputChange} defaultValue={players.length > 0 ? players[0].ingamename : ""} required />

                <label htmlFor="accountlevel">Account Level: </label>
                <input type="text" id="accountlevel" name="accountlevel" defaultValue={players.length > 0 ? players[0].accountlevel : ""} required />

                <input type="submit" value="Submit" />
            </form>

            <Link to={`/players`}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
