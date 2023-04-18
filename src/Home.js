import React from 'react';
import './Style/Home.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='content'>
            <div className='title'>
                <h1 className='title'>Game management system</h1>
            </div>

            <hr className='hr1'></hr>

            <div className='boxcontain'>
                <Link className='link' to={"/App"}>
                    <div className='box'>
                        <h4>Games</h4>
                    </div>
                </Link>
                <Link className='link' to={"/allservers"}>
                    <div className='box'>
                        <h4>Servers</h4>
                    </div>
                </Link>
                <Link className='link' to={"/accounts"}>
                    <div className='box'>
                        <h4>Accounts</h4>
                    </div>
                </Link>
                <Link className='link' to={"/server-locations"}>
                    <div className='box'>
                        <h4>Server Locations</h4>
                    </div>
                </Link>
                <Link className='link' to={"/players"}>
                    <div className='box'>
                        <h4>Players</h4>
                    </div>
                </Link>
                <Link className='link' to={"/admin-tools"}>
                    <div className='box'>
                        <h4>Admin Tools</h4>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Home;