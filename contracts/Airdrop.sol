pragma solidity ^0.7.4;
import "./Owned.sol";
import "./ERC20.sol";

//SPDX-License-Identifier: MIT

contract AirDrop is Owned {
    using SafeMath for uint256;

    uint256 public totalUMBRHoldings = 0;
    uint256 public totalLPHoldings = 0;

    uint256 public airdropSnapshotBlock = 1; //11949940 is 1st March 2021

    mapping(address => uint256) public UmbrLpAirdropEntitlement;
    mapping(address => uint256) public UmbrAirdropEntitlement;

    mapping(address => uint16) public UmbrLPClaimed;
    mapping(address => uint16) public UmbrClaimed;

    ERC20 private airdropToken;

    event AirDropped(address recipient, uint256 amount);

    constructor(
        ERC20 _airdropToken,
        uint256 _totalUMBRHoldings,
        uint256 _totalLPHoldings
    ) public {
        airdropToken = _airdropToken;
        totalUMBRHoldings = _totalUMBRHoldings;
        totalLPHoldings = _totalLPHoldings;
    }

    function getTotalUMBRHoldings() external view returns (uint256) {
        return totalUMBRHoldings;
    }

    function getTotalUMBREthLpHoldings() external view returns (uint256) {
        return totalLPHoldings;
    }

    function setLPHoldersAirdrop(
        address[] memory _addresses,
        uint256[] memory _amounts
    ) external onlyOwner {
        require(
            _addresses.length == _amounts.length,
            "ERROR: Addreses length must equal amounts length"
        );

        require(
            block.number > airdropSnapshotBlock,
            "ERROR: Block number must be greater than 11949940 - 1st March 2021"
        );

        for (uint256 i = 0; i < _addresses.length; i++) {
            UmbrLpAirdropEntitlement[_addresses[i]] = _amounts[i];
            totalLPHoldings += _amounts[i];
        }
    }

    function setTokenHoldersAirdrop(
        address[] memory _addresses,
        uint256[] memory _amounts
    ) external onlyOwner {
        require(
            _addresses.length == _amounts.length,
            "ERROR: Addreses length must equal amounts length"
        );

        require(
            block.number > airdropSnapshotBlock,
            "ERROR: Block number must be greater than 11949940 - 1st March 2021"
        );

        for (uint256 i = 0; i < _addresses.length; i++) {
            UmbrAirdropEntitlement[_addresses[i]] = _amounts[i];
            totalLPHoldings += _amounts[i];
        }
    }

    function seeUmbrAirdropEntitlement() external view returns (uint256) {
        require(
            UmbrAirdropEntitlement[msg.sender] != 0,
            "ERROR: Your UMBR Balance at March 1st 2021 was too low to claim this airdrop"
        );

        return UmbrAirdropEntitlement[msg.sender];
    }

    function seeLPAirdropEntitlement() external view returns (uint256) {
        require(
            UmbrLpAirdropEntitlement[msg.sender] != 0,
            "ERROR: Your LP Balance at March 1st 2021 was too low to claim this airdrop"
        );

        return UmbrLpAirdropEntitlement[msg.sender];
    }

    function checkAlreadyClaimedUmbrAirdrop() external view returns (uint16) {
        return UmbrClaimed[msg.sender];
    }

    function checkAlreadyClaimedUmbrEthLpAirdrop()
        external
        view
        returns (uint16)
    {
        return UmbrLPClaimed[msg.sender];
    }

    function claimLPAirdrop() external payable {
        require(
            UmbrLpAirdropEntitlement[msg.sender] >= 0,
            "ERROR: Your LP Balance at March 1st 2021 was too low to claim this airdrop"
        );

        require(
            UmbrLPClaimed[msg.sender] == 0,
            "Error: This address has already claimed the LP airdrop"
        );

        UmbrLPClaimed[msg.sender] = 1;

        emit AirDropped(msg.sender, UmbrLpAirdropEntitlement[msg.sender]);

        airdropToken.transfer(msg.sender, UmbrLpAirdropEntitlement[msg.sender]);
    }

    function claimUMBRAirdrop() external payable {
        require(
            UmbrAirdropEntitlement[msg.sender] > 99,
            "ERROR: Your LP Balance at March 1st 2021 was too low to claim this airdrop"
        );

        require(
            UmbrClaimed[msg.sender] == 0,
            "Error: This address has already claimed the UMBR airdrop"
        );

        UmbrClaimed[msg.sender] = 1;

        airdropToken.approve(msg.sender, UmbrAirdropEntitlement[msg.sender]);

        emit AirDropped(msg.sender, UmbrAirdropEntitlement[msg.sender]);

        airdropToken.transfer(msg.sender, UmbrAirdropEntitlement[msg.sender]);
    }
}
