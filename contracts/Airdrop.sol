pragma solidity ^0.7.4;
import "./Owned.sol";
import "./ERC20.sol";

//SPDX-License-Identifier: MIT

contract AirDrop is Owned {
    using SafeMath for uint256;

    uint8 public constant DECIMALS = 18;
    uint256 public constant DECIMALFACTOR = 10**uint256(DECIMALS);
    uint256 public AIRDROP_SUPPLY = 500000 * uint256(DECIMALFACTOR);
    uint256 public TOTAL_SUPPLY = 10000000 * uint256(DECIMALFACTOR);
    uint256 public claimedTokens = 0;

    uint256 public totalUMBRHoldings = 0;
    uint256 public totalLPHoldings = 0;

    uint256 public airdropSnapshotBlock = 1; //11949940 is 1st March 2021

    mapping(address => uint256) public UmbrEthLpBalance;
    mapping(address => uint256) public UmbrBalance;

    ERC20 public airdropToken;

    event AirDropped(
        address[] _recipients,
        uint256 _amount,
        uint256 claimedTokens
    );

    constructor(ERC20 token) public {
        airdropToken = token;
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

    function claimLPAirdrop() external view {
        require(
            UmbrEthLpBalance[msg.sender] != 0,
            "ERROR: Your LP Balance at March 1st 2021 was too low to claim this airdrop"
        );
    }

    function claimUMBRAirdrop() external view {
        require(
            UmbrEthLpBalance[msg.sender] > 100,
            "ERROR: Your LP Balance at March 1st 2021 was too low to claim this airdrop"
        );
    }

    function airDrop(address[] memory _recipients, uint256 _amount)
        external
        onlyOwner
    {
        require(_amount > 0);
        uint256 airdropped;
        uint256 amount = _amount * uint256(DECIMALFACTOR);
        for (uint256 index = 0; index < _recipients.length; index++) {
            airdropToken.transfer(_recipients[index], amount);
            airdropped = airdropped.add(amount);
        }
        AIRDROP_SUPPLY = AIRDROP_SUPPLY.sub(airdropped);
        TOTAL_SUPPLY = TOTAL_SUPPLY.sub(airdropped);
        claimedTokens = claimedTokens.add(airdropped);
        emit AirDropped(_recipients, _amount, claimedTokens);
    }
}
