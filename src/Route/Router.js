import React from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';

import Home from '../Home';
import App from '../App';
import GameDetail from '../components/Detail/GameDetail';
import AddGame from '../components/Create/AddGame';
import EditGame from '../components/Edit/EditGame';
import ServerDetail from '../components/Detail/ServerDetail';
import TopPlayer from '../TopPlayer';
import PlayerDetail from '../components/Detail/PlayerDetail';
import Accounts from '../Accounts';
import CreateAcc from '../components/Create/CreateAcc';
import AccountDetail from '../components/Detail/AccountDetail';
import EditAccount from '../components/Edit/EditAcc';
import Allservers from '../Allservers';
import CreateServer from '../components/Create/CreateServer';
import EditServer from '../components/Edit/EditServer';
import ServerLocation from '../ServerLoc';
import CreateServerLocation from '../components/Create/CreateServLoc';
import ServerLocationDetails from '../components/Detail/ServLocDatial';
import EditServerLocationDetails from '../components/Edit/EditServLoc';
import Players from '../Players';
import AdminTools from '../AdminTools';
import EditPlayer from '../components/Edit/EditPlayer';
import CreatePlayer from '../components/Create/CreatePlayer';

import AddServer from '../components/Create/AddServer';
import AddPlayer from '../components/Create/AddPlayer';

import Layout from '../Layout';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="" element={<Navigate to="/home" />} /> 
                    <Route path="/allgames" element={<App />} />
                    <Route path="/allservers" element={<Allservers />} />
                    <Route path="/game-detail/:slug" element={<GameDetail />} />
                    <Route path="/addgame" element={<AddGame />} />
                    <Route path="/editgame/:slug" element={<EditGame />} />
                    <Route path="/server-detail/:slug" element={<ServerDetail />} />
                    <Route path="/game-detail/:slug/top-player" element={<TopPlayer />} />
                    <Route path="/game-detail/:gameid/player-detail/:slug" element={<PlayerDetail />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/accounts/create-account" element={<CreateAcc />} />
                    <Route path="/accounts/account-detail/:slug" element={<AccountDetail />} />
                    <Route path="/edit-account/:slug" element={<EditAccount />} />
                    <Route path="/allservers/create-server" element={<CreateServer />} />
                    <Route path="/server-detail/:slug/edit-server" element={<EditServer />} />
                    <Route path="/server-locations" element={<ServerLocation />} />
                    <Route path="/server-locations/create-serverlocation" element={<CreateServerLocation />} />
                    <Route path="/server-locations/:slug" element={<ServerLocationDetails />} />
                    <Route path="/edit-serverlocation/:slug" element={<EditServerLocationDetails />} />
                    <Route path="/players" element={<Players />} />
                    <Route path="/admin-tools" element={<AdminTools />} />
                    <Route path="/edit-player/:slug" element={<EditPlayer />} />
                    <Route path="/players/create-player" element={<CreatePlayer />} />
                    
                    <Route path="/game-detail/:slug/add-server" element={<AddServer />} />
                    <Route path="/game-detail/:slug/add-player" element={<AddPlayer />} />
                </Route>
                <Route>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers;