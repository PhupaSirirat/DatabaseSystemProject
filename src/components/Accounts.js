import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Accounts() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchAccounts();
    }, [])

    const fetchAccounts = () => {
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-accountlist`)
            .then(response => {
                setAccounts(response.data);
            })
            .catch(error => alert(error));
    }

    return (
        <main>
            <h1>Accounts</h1>

            {accounts.length > 0 ? (
                // Render if server available
                accounts.map(item => (
                    <Link to={`account-detail/${item.accountid}`}>
                        <div key={item.accountid} className="game-item">
                            <p>Username: {item.username}</p>
                            <p>Email: {item.email}</p>
                        </div>
                    </Link>
                ))
            ) : (
                // Render message if no data available
                <p>Data Fetching...</p>
            )}
            

            <Link to={`create-account`}>
                <button className='nice_dark_butt_on'>Create account</button>
            </Link>

            <Link to={`/`}>
                <button className='nice_butt_on'>Back</button>
            </Link>
        </main>
    )
}
