pragma solidity ^0.7.4;
import "./Owned.sol";
import "./ERC20.sol";

//SPDX-License-Identifier: MIT

contract AirDrop is Owned {
    using SafeMath for uint256;

    uint8 public constant decimals = 18;
    uint256 public constant decimal_factor = 10**uint256(decimals);
    uint256 public airdrop_supply = 100000 * uint256(decimal_factor);
    uint256 public claimedTokens = 0;

    uint256 public totalUMBRHoldings = 0;
    uint256 public totalLPHoldings = 0;

    uint256 public airdropSnapshotBlock = 1; //11949940 is 1st March 2021

    mapping(address => uint256) public UmbrEthLpBalance;
    mapping(address => uint256) public UmbrBalance;

    mapping(address => uint16) public UmbrEthLpClaimed;
    mapping(address => uint16) public UmbrClaimed;

    ERC20 private airdropToken;

    event AirDropped(address recipient, uint256 amount);

    constructor(
        ERC20 _airdropToken,
        uint256 _totalUMBRHoldings,
        uint256 _totalLPHoldings
    ) public {
        airdropToken = _airdropToken;
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
            UmbrEthLpBalance[_addresses[i]] = _amounts[i];
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
            UmbrBalance[_addresses[i]] = _amounts[i];
            totalLPHoldings += _amounts[i];
        }
    }

    function seeUmbrAirdropEntitlement() external view returns (uint256) {
        require(
            UmbrBalance[msg.sender] != 0,
            "ERROR: Your UMBR Balance at March 1st 2021 was too low to claim this airdrop"
        );

        return UmbrBalance[msg.sender];
    }

    function seeLPAirdropEntitlement() external view returns (uint256) {
        require(
            UmbrEthLpBalance[msg.sender] != 0,
            "ERROR: Your LP Balance at March 1st 2021 was too low to claim this airdrop"
        );

        return UmbrEthLpBalance[msg.sender];
    }

    function checkAlreadyClaimedUmbrAirdrop() external view returns (uint16) {
        return UmbrClaimed[msg.sender];
    }

    function checkAlreadyClaimedUmbrEthLpAirdrop()
        external
        view
        returns (uint16)
    {
        return UmbrEthLpClaimed[msg.sender];
    }

    function claimLPAirdrop() external payable {
        require(
            UmbrEthLpBalance[msg.sender] >= 0,
            "ERROR: Your LP Balance at March 1st 2021 was too low to claim this airdrop"
        );

        require(
            UmbrEthLpClaimed[msg.sender] == 0,
            "Error: This address has already claimed the LP airdrop"
        );

        UmbrEthLpClaimed[msg.sender] = 1;

        airdropToken.approve(msg.sender, UmbrEthLpBalance[msg.sender]);

        emit AirDropped(msg.sender, UmbrEthLpBalance[msg.sender]);

        //airdropToken.increaseAllowance(
        //    msg.sender,
        //    UmbrEthLpBalance[msg.sender]
        //);

        airdropToken.transferFrom(
            address(this),
            msg.sender,
            UmbrEthLpBalance[msg.sender]
        );
    }

    function claimUMBRAirdrop() external payable {
        require(
            UmbrBalance[msg.sender] > 100,
            "ERROR: Your LP Balance at March 1st 2021 was too low to claim this airdrop"
        );

        require(
            UmbrClaimed[msg.sender] == 0,
            "Error: This address has already claimed the UMBR airdrop"
        );

        UmbrClaimed[msg.sender] = 1;

        airdropToken.approve(msg.sender, UmbrBalance[msg.sender]);

        emit AirDropped(msg.sender, UmbrBalance[msg.sender]);

        airdropToken.transferFrom(
            address(this),
            msg.sender,
            UmbrBalance[msg.sender]
        );
    }
}
