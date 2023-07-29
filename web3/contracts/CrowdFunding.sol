// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns; //we are mapping an id to the struct Campaign and defining campaigns.

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns]; //campaign is a local variable to the function and we are storing the campaings mapping.

        //we are using a require statement to check that everything is good. (block.timestamp) gives the current time.
        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future. "
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    // payable keyword signifies that we are going to send some cryptocurrency through this function.
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value; //(msg.value) this is value that we are sending through the front end.

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender); //(msg.sender) address of the sender.
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}(""); //amount is sent to the owner.

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns); //we are creating an empty array with as many elements as numberOfCampaigns.

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
