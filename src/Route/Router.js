import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from '../App';
import GameDetail from '../components/Detail/GameDetail';
import AddGame from '../components/Create/AddGame';
import EditGame from '../components/Edit/EditGame';
import ServerDetail from '../components/Detail/ServerDetail';
import TopPlayer from '../components/TopPlayer';
import PlayerDetail from '../components/Detail/PlayerDetail';
import Accounts from '../components/Accounts';
import CreateAcc from '../components/Create/CreateAcc';
import AccountDetail from '../components/Detail/AccountDetail';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/game-detail/:slug" element={<GameDetail />}/>
                <Route path="/addgame" element={<AddGame/>}/>
                <Route path="/editgame/:slug" element={<EditGame/>}/>
                <Route path="/server-detail/:slug" element={<ServerDetail />}/>
                <Route path="/game-detail/:slug/top-player" element={<TopPlayer />}/>
                <Route path="/game-detail/:gameid/player-detail/:slug" element={<PlayerDetail />}/>
                <Route path="/accounts" element={<Accounts />}/>
                <Route path="/accounts/create-account" element={<CreateAcc />}/>
                <Route path="/accounts/account-detail/:slug" element={<AccountDetail />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers;