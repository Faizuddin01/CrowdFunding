import React, { useState, useContext, createContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, thirdweb, meta } from '../assets';
import { navlinks } from '../constants';
import { AppContext } from '../App';
var postLog = true;

const Navbar = () => {
    const { disconnect } = useStateContext();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const { sb_setIsActive } = useContext(AppContext);
    const { connect, address } = useStateContext();
    useEffect(() => {
        if (isActive == 'logout') {
            disconnect();
            setIsActive('dashboard');
        }
    }, [isActive]);
    return (
        <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
            <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px] bg-[#efeff0] backdrop-blur-md bg-opacity-10  border border-slate-500 shadow-secondary">
                <input type="text" placeholder="Search for campaigns" className="felx w-full font-epilogue font-normal text-[14px] placeholder:text-[lightgray] text-white bg-transparent outline-none ml-3" />
                <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
                    <img src={search} alt="search" className="[w-15px] h-[15px] object-contain" />
                </div>
            </div>
            <div className="sm:flex hidden flex-row justify-end gap-4">
                <CustomButton
                    btnType="button"
                    title={address ? 'Create a Campaign ' : 'Connect'}
                    styles={address ? 'bg-[#1dc071] hover:bg-[#80ba9e] transition-all' : 'bg-[#8c6dfd] hover:bg-[#ab95fc] transition-all'}
                    handleClick={() => {
                        if (address) {
                            navigate('create-campaign');
                            sb_setIsActive('campaign');
                        }
                        else {
                            connect();
                            sb_setIsActive('dashboard');
                            navigate('/');
                        }
                    }}
                />
                <Link to='/profile' onClick={() => { sb_setIsActive('profile') }}>
                    <div className="w-[52px] h-[52px] rounded-full bg-[#1c1c24] flex justify-center items-center cursor-pointer">
                        <img src={thirdweb} alt="user" className="w-60% h-[60%] object-contain" />
                    </div>
                </Link>
            </div>

            {/* small screen navigation */}
            <div className="sm:hidden flex justify-between items-center relative">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-[#efeff0] bg-opacity-10 backdrop-blur-sm border border-slate-500 shadow-secondary flex justify-center items-center cursor-pointer">
                    <img src={meta} alt="user" className="w-60% h-[60%] object-contain" />
                </div>

                <img src={menu}
                    alt="menu"
                    className="w-[34px] h-[34px object-contain cursor-pointer"
                    onClick={() => setToggleDrawer(!toggleDrawer)}
                />

                <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] bg-opacity-95 backdrop-blur-sm z-10 shadow-secondary py-4 rounded ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
                    <ul className="mb-4">
                        {navlinks.map((link) => (
                            <li
                                key={link.name}
                                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                                onClick={() => {
                                    setIsActive(link.name);
                                    setToggleDrawer(false);
                                    navigate(link.link);
                                }}
                            >
                                <img
                                    src={`${isActive === link.name ? link.imgUrl : link.imgUrl_grey}`}
                                    alt={link.name}
                                    className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                                />
                                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[white]' : 'text-[#808191]'}`}>
                                    {link.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <div className="flex mx-4 ">
                        <CustomButton
                            btnType="button"
                            title={address ? 'Create a campaign' : 'Connect'}
                            styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                            handleClick={() => {
                                if (address) {
                                    navigate('create-campaign')
                                    setToggleDrawer(false);
                                }
                                else connect();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
export { postLog }