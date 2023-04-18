import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Style/HtmlElement.css';
import axios from 'axios';

function AddGame() {
  const [input, setInput] = useState('');
  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    // Collect input values
    const gamename = event.target.gamename.value;
    const genre = event.target.genre.value;
    const version = event.target.version.value;
    const description = event.target.description.value;
    const releasedate = event.target.releasedate.value;
    const systems = event.target.systems.value;
    const agerating = event.target.agerating.value;
    const thumbnail = event.target.thumbnail.value;

    // Display input values in an alert
    alert(`Data to insert.\nGame: ${gamename}\nGenre: ${genre}\nVersion: ${version}\nDescription: ${description}\nRelease Date: ${releasedate}\nSystems: ${systems}\nAge Rating: ${agerating}\nThumbnail Link: ${thumbnail}`);

    const sql = `insert into game values ('${gamename}','${description}','${releasedate}','${systems}','${version}','${genre}','${agerating}','${thumbnail}')`;
    axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
      .then(response => {
        if (response.data['error']) {
          alert(response.data.error); return;
        }
        alert("Insert successfully")
        window.location = '/App';
      })
      .catch(error => alert(error));
  };

  return (
    <main className='addgame'>
      <h1 className='addgame'>{input.length > 0 ? input : "[Untitled]"}</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="gamename">Game Name:</label>
        <input type="text" id="gamename" name="gamename" required onChange={handleInputChange} />

        <label htmlFor="genre">Genre:</label>
        <input type="text" id="genre" name="genre" required />

        <label htmlFor="version">Version:</label>
        <input type="text" id="version" name="version" required />

        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" required />

        <label htmlFor="releasedate">Release Date</label>
        <input type="date" id="releasedate" name="releasedate" required />

        <label htmlFor="systems">Systems</label>
        <input type="text" id="systems" name="systems" required />

        <label htmlFor="agerating">Age Rating</label>
        <input type="text" id="agerating" name="agerating" required />

        <label htmlFor="thumbnail">Thumbnail Link:</label>
        <input type="text" id="thumbnail" name="thumbnail" required />

        <input type="submit" value="Submit" />
      </form>

      <Link to={"/App"}>
        <button className='nice_butt_on'>Back</button>
      </Link>
    </main>
  );
}

export default AddGame;
