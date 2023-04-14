import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from '../App';
import GameDetail from '../GameDetail';
import AddGame from '../components/AddGame';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/game-detail/:slug" element={<GameDetail />}/>
                <Route path="/addgame" element={<AddGame/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers;