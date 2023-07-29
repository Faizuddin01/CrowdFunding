import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';
import { loader } from '../assets';
import { useStateContext } from '../context';

const DisplayCampaigns = ({ title, isLoading, campaigns, user }) => {
    const navigate = useNavigate();
    const { address } = useStateContext();
    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    }

    return (
        <div>
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
                {title} ({campaigns.length})
            </h1>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {isLoading && (
                    <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
                )}

                {!isLoading && campaigns.length === 0 && address && (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183] w-full">
                        You have not created any campigns yet
                    </p>
                )}

                {!isLoading && !address && (<h1 className="font-epilogue font-semibold text-[16px] leading-[30px] text-[#818183] w-full">Please Connect your Wallet</h1>)}

                {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard
                    key={campaign.id}
                    {...campaign}
                    handleClick={() => handleNavigate(campaign)}
                />)}
            </div>
        </div>
    )
}

export default DisplayCampaigns