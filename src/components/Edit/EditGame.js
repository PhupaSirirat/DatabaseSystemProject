import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function EditGame() {

    const [input, setInput] = useState('');
    const handleInputChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const { slug } = useParams(); // Access the 'slug' parameter from the URL
    // const formRef = useRef(null);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission

        // Collect input values
        const gamename = event.target.gamename.value;
        const gameid = event.target.gameid.value;
        const genre = event.target.genre.value;
        const version = event.target.version.value;
        const description = event.target.description.value;
        const releasedate = event.target.releasedate.value;
        const systems = event.target.systems.value;
        const agerating = event.target.agerating.value;
        const thumbnail = event.target.thumbnail.value;

        // Display input values in an alert
        alert(`Data to Update.\nGame: ${gamename}\nGameID: ${gameid}\nGenre: ${genre}\nVersion: ${version}\nDescription: ${description}\nRelease Date: ${releasedate}\nSystems: ${systems}\nAge Rating: ${agerating}\nThumbnail Link: ${thumbnail}`);

        const sql = `update game set gamename='${gamename}', description='${description}',releasedate='${releasedate}',systems='${systems}',version='${version}',genre='${genre}',agerating='${agerating}',thumbnail_link='${thumbnail}' where gameid='${gameid}'`;
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            .then(response => {
                if (response.data['error']) {
                    alert(response.data.error); return;
                }
                alert("Update successfully")
                window.location = `/game-detail/${slug}`;
            })
            .catch(error => alert(error));
    };

    const fetchData = () => {
        const sql = `select * from game where gameid=${slug}`
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            // if fetching successfully
            .then(response => {
                console.log(response.data[0]);
                setData(response.data[0]);
                // console.log(typeof (data.releasedate));
            })
            .catch(err => alert(err));
    }

    return (
        <main>
            <h1 className='addgame'>{input.length > 0 ? input : data.gamename}</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="gamename">Game Name:</label>
                <input type="text" id="gamename" name="gamename" onChange={handleInputChange} defaultValue={data.gamename} required />

                <label htmlFor="gameid">GameID:</label>
                <input type="text" id="gameid" name="gameid" defaultValue={data.gameid} readOnly />

                <label htmlFor="genre">Genre:</label>
                <input type="text" id="genre" name="genre" defaultValue={data.genre} required />

                <label htmlFor="version">Version:</label>
                <input type="text" id="version" name="version" defaultValue={data.version} required />

                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" defaultValue={data.description} required />

                <label htmlFor="releasedate">Release Date</label>
                <input type="text" id="releasedate" name="releasedate" defaultValue={data.releasedate} required />

                <label htmlFor="systems">Systems</label>
                <input type="text" id="systems" name="systems" defaultValue={data.systems} required />

                <label htmlFor="agerating">Age Rating</label>
                <input type="text" id="agerating" name="agerating" defaultValue={data.agerating} required />

                <label htmlFor="thumbnail">Thumbnail Link:</label>
                <input type="text" id="thumbnail" name="thumbnail" defaultValue={data.thumbnail_link} required />

                <input type="submit" value="Submit Edit" />
            </form>

            <Link to={`/game-detail/${slug}`}>
                <button className='button-79'>Back</button>
            </Link>
        </main>
    )
}
