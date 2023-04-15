import React from 'react'
import { useParams, Link } from 'react-router-dom';

export default function ServerDetail() {
    const { slug } = useParams(); // Access the 'slug' parameter from the URL
    return (
        <main>
            <h1>Server Detail Page: Game Server ID = {slug}</h1>

            <Link to={"/"}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    );
}
