import React from 'react';
import { Link } from 'react-router-dom';

export default function Players() {
  return (
    <main>
        <h1>Players</h1>

        <Link to={"/"}>
        <button className='nice_butt_on'>Home</button>
      </Link>
    </main>
  )
}
