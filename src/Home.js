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
                        <img src="/icons/004-game-control.png" alt="" />
                        <h4>Games</h4>
                    </div>
                </Link>
                <Link className='link' to={"/allservers"}>
                    <div className='box'>
                        <img src="/icons/003-server.png" alt="" />
                        <h4>Servers</h4>
                    </div>
                </Link>
                <Link className='link' to={"/accounts"}>
                    <div className='box'>
                        <img src="/icons/005-account.png" alt="" />
                        <h4>Accounts</h4>
                    </div>
                </Link>
                <Link className='link' to={"/server-locations"}>
                    <div className='box'>
                        <img src="/icons/002-location.png" alt="" />
                        <h4>Server Locations</h4>
                    </div>
                </Link>
                <Link className='link' to={"/players"}>
                    <div className='box'>
                        <img src="/icons/001-profile.png" alt="" />
                        <h4>Players</h4>
                    </div>
                </Link>
                <Link className='link' to={"/admin-tools"}>
                    <div className='box'>
                        <img src="/icons/006-wrench.png" alt="" />
                        <h4>Admin Tools</h4>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Home;