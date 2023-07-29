import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { sun, meta } from '../assets';
import { navlinks } from '../constants';

import { useStateContext } from '../context';

import { AppContext } from '../App';

const Icon = ({ styles, name, imgUrl, imgUrl_grey, isActive, disabled, handleClick, handleReset }) => (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#efeff0] bg-opacity-25 border border-slate-600'} flex justify-center items-center 
    ${!disabled && 'cursor-pointer'} ${styles} hover:bg-[#efeff0] hover:bg-opacity-25 transition-all`} onClick={name === "logout" ? handleReset : handleClick}>
        {isActive === name ? (
            <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
        ) : (
            <img src={imgUrl_grey} alt="fund_logo" className={`w-1/2 h-1/2 `} />
        )
        }
    </div>
)

const Sidebar = ({ sb_isActive }) => {
    const { disconnect } = useStateContext();
    const navigate = useNavigate(); //recall that as a hook.
    const { sb_setIsActive } = useContext(AppContext);
    return (
        <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh] ">
            <Link to="https://thirdweb.com/goerli/0xa7a7dc83266123c426f50d46F71C1c721ab9b5Ed/explorer">
                <Icon styles="w-[60px] h-[60px] bg-[#1c1c24] shadow-secondary" imgUrl={meta} />
            </Link>

            <div className="flex-1 flex flex-col justify-between items-center bg-[#efeff0] bg-opacity-10 backdrop-blur-sm border border-slate-600 rounded-[20px] w-[76px] py-4 mt-12 shadow-secondary">
                <div className="flex flex-col justify-center items-center gap-y-3.5 ">
                    {navlinks.map((Link) => (
                        <Icon
                            key={Link.name}
                            {...Link}
                            isActive={sb_isActive}
                            handleClick={() => {
                                if (!Link.disabled) {
                                    sb_setIsActive(Link.name);
                                    navigate(Link.link);
                                }
                            }}
                            handleReset={() => {
                                sb_setIsActive(Link.name);
                                navigate(Link.link);
                                disconnect();
                            }}
                        />
                    ))}
                </div>
                <Icon styles=" shadow-secondary bg-opacity-25 border border-slate-700" imgUrl={sun} />
            </div>
        </div>
    )
}

export default Sidebar
