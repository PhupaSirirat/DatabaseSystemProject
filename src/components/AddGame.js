import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Style/AddGame.css';

function AddGame() {
  const formRef = useRef(null);

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

    // Display input values in an alert
    alert(`Game: ${gamename}\nGameID: ${gameid}\nGenre: ${genre}\nVersion: ${version}\nDescription: ${description}\nRelease Date: ${releasedate}\nSystems: ${systems}`);

    // Reset the form
    formRef.current.reset();
  };

  return (
    <main>
      <h1>Add Game Page</h1>

      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="gamename">Game:</label>
        <input type="text" id="gamename" name="gamename" required />
        <br />

        <label htmlFor="gameid">GameID:</label>
        <input type="text" id="gameid" name="gameid" required />
        <br />

        <label htmlFor="genre">Genre:</label>
        <input type="text" id="genre" name="genre" required />
        <br />

        <label htmlFor="version">Version:</label>
        <input type="text" id="version" name="version" required />
        <br />

        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" required />
        <br />

        <label htmlFor="releasedate">Release Date</label>
        <input type="date" id="releasedate" name="releasedate" required />
        <br />

        <label htmlFor="systems">Systems</label>
        <input type="text" id="systems" name="systems" required />
        <br />

        <input type="submit" value="Submit" />
      </form>

      <Link to={"/"}>
        <button className='nice_butt_on'>Back</button>
      </Link>
    </main>
  );
}

export default AddGame;
