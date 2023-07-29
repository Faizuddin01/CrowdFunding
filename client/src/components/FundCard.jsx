import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';

function Tilt(props) {
    const { options, ...rest } = props;
    const tilt = useRef(null);

    useEffect(() => {
        VanillaTilt.init(tilt.current, options);
    }, [options]);

    return <div ref={tilt} {...rest} />;
}

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
    const remainingDays = daysLeft(deadline);

    const options = {
        speed: 1000,
        max: 15
    };

    const smOptions = {
        speed: 0,
        max: 0
    };

    if (window.innerWidth >= 640) {
        options.scale = 1.08;
    } else {
        smOptions.scale = 1;
    }

    return (
        <Tilt className="sm:w-[288px] w-full" options={window.innerWidth >= 640 ? options : smOptions}>
            <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer shadow-secondary" onClick={handleClick}>
                <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]" />

                <div className="flex flex-col p-4 ">
                    <div className="flex flex-row items-center mb-[18px]">
                        <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain" />
                        <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Catalog</p>
                    </div>

                    <div className="block">
                        <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
                        <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
                    </div>

                    <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                        <div className="flex flex-col">
                            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{amountCollected}</h4>
                            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Raised of {target}</p>
                        </div>
                        {remainingDays > 0 ? (<div className="flex flex-col">
                            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px] text-right">{remainingDays}</h4>
                            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate text-right">Days Left</p>
                        </div>) : (<div className="flex flex-row items-center"><h4 className="font-epilogue font-bold text-[15px] text-[#b2b3bd] leading-[22px]">Closed</h4></div>)}
                    </div>

                    <div className="flex items-center mt-[20px] gap-[12px]">
                        <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
                            <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain" />
                        </div>
                        <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
                    </div>
                </div>
            </div>
        </Tilt>
    )
}

export default FundCard