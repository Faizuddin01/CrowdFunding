import React, { createContext, useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';

import { applebg } from './assets';

export const AppContext = createContext();

const App = () => {
    const [sb_isActive, sb_setIsActive] = useState('dashboard');
    return (
        <AppContext.Provider value={{ sb_setIsActive }}>
            <div className="relative sm:-8 p-4 min-h-screen flex flex-row" style={{ backgroundImage: `url(${applebg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                <div className="sm:flex hidden mr-10 relative">
                    <Sidebar sb_isActive={sb_isActive} sb_setIsActive={sb_setIsActive} />
                </div>

                <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                    <Navbar sb_isActive={sb_isActive} sb_setIsActive={sb_setIsActive} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/create-campaign" element={<CreateCampaign />} />
                        <Route path="/campaign-details/:id" element={<CampaignDetails />} />
                    </Routes>
                </div>
            </div>
        </AppContext.Provider>
    )
}

export default App