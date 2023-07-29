import React, { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt';

function Tilt(props) {
    const { options, ...rest } = props;
    const tilt = useRef(null);

    useEffect(() => {
        VanillaTilt.init(tilt.current, options);
    }, [options]);

    return <div ref={tilt} {...rest} />;
}

const options = {
    scale: 1.05,
    speed: 1000,
    max: 15
};

const smOptions = {
    scale: 1,
    speed: 0,
    max: 0
};

const CountBox = ({ title, value }) => {
    return (
        <Tilt options={window.innerWidth >= 640 ? options : smOptions}>
            <div className="flex flex-col items-center w-[150px]">
                <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate shadow-secondary">{value}</h4>
                <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rounded-b-[10px] text-center shadow-secondary">{title}</p>
            </div>
        </Tilt>
    )
}

export default CountBox