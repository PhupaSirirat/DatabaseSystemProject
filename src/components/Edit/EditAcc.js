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
        // alert(`Data to Update.\nGame: ${gamename}\nGameID: ${gameid}\nGenre: ${genre}\nVersion: ${version}\nDescription: ${description}\nRelease Date: ${releasedate}\nSystems: ${systems}\nAge Rating: ${agerating}\nThumbnail Link: ${thumbnail}`);

        // const sql = `update game set gamename='${gamename}', description='${description}',releasedate='${releasedate}',systems='${systems}',version='${version}',genre='${genre}',agerating='${agerating}',thumbnail_link='${thumbnail}' where gameid='${gameid}'`;
        // axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
        //     .then(Response => {
        //         alert("Update successfully")
        //         window.location = `/game-detail/${slug}`;
        //     })
        //     .catch(error => alert(error));
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
            <h1>Edit Game Page: Game ID = {slug}</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="gamename">Game:</label>
                <input type="text" id="gamename" name="gamename" defaultValue={data.gamename} required />
                <br />

                <label htmlFor="gameid">GameID:</label>
                <input type="text" id="gameid" name="gameid" defaultValue={data.gameid} readOnly />
                <br />

                <label htmlFor="genre">Genre:</label>
                <input type="text" id="genre" name="genre" defaultValue={data.genre} required />
                <br />

                <label htmlFor="version">Version:</label>
                <input type="text" id="version" name="version" defaultValue={data.version} required />
                <br />

                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" defaultValue={data.description} required />
                <br />

                <label htmlFor="releasedate">Release Date</label>
                <input type="text" id="releasedate" name="releasedate" defaultValue={data.releasedate} required />
                <br />

                <label htmlFor="systems">Systems</label>
                <input type="text" id="systems" name="systems" defaultValue={data.systems} required />
                <br />

                <label htmlFor="agerating">Age Rating</label>
                <input type="text" id="agerating" name="agerating" defaultValue={data.agerating} required />
                <br />

                <label htmlFor="thumbnail">Thumbnail Link:</label>
                <input type="text" id="thumbnail" name="thumbnail" defaultValue={data.thumbnail_link} required />
                <br />

                <input type="submit" value="Submit Edit" />
            </form>

            <Link to={`/game-detail/${slug}`}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
