import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../Home';
import App from '../App';
import GameDetail from '../GameDetail';
import AddGame from '../components/AddGame';
import EditGame from '../components/EditGame';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/App" element={<App/>}/>
                <Route path="/game-detail/:slug" element={<GameDetail />}/>
                <Route path="/addgame" element={<AddGame/>}/>
                <Route path="/editgame/:slug" element={<EditGame/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers;