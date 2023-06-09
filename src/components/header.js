import React from 'react';
import { Link } from 'react-router-dom';

export default function header() {
    return (
        <header className="header">
            <Link to="/home">
                <img src="/icons/home.png" alt="home" className="home-btn"/>
                <p className="header-p">Game Management System</p>
            </Link>
        </header>
    )
}
