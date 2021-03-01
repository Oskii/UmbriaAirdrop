const Airdrop = artifacts.require("Airdrop");
const MockERC20 = artifacts.require("MockERC20");

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/89f762f8adbe4f819b574fc5c523d6ad');

module.exports = async function (deployer, network, accounts) {
    
    var airdropUMBRAmount = web3.utils.toWei("33334");

    var airdropLPAmount = web3.utils.toWei("66666");

    var UmbrHolders = 
        [
            accounts[0],   //Ganache Account 1
            accounts[1],   //Ganache Account 2
            "0xa76ae94659b6b53c5e85d37fbdd36adcb7635b23",
            "0x0524fe637b77a6f5f0b3a024f7fd9fe1e688a291",
            "0x5cba95d4d73bd4142486b65cf2b484c5dbbecf37",
            "0x82e5290c810539e120193dfa8b1c1207bad89fab",
            "0xf35521595860c2a4d98a59ccc23bf565772d47d4",
            "0xa745067637cfea3fef6861135fad57ad38df3bfe",
            "0xa8644d09a7e391ef098d642a5de50443ab343add",
            "0xcfa8c91bedaf0cd83e1a07981842e3525228c5a1",
            "0x674c962a0e8da3403851f4fc8dd166a28bc09ff5",
            "0x984b39b4d5dbf81c4fa7dcc1501f27b52dc74c5d",
            "0x4659fda24b3675bb18b2bf645703d0c344c0f665",
            "0x3517ec1d7fe5e46c4d61fec0e59ee12808a3aedf",
            "0x1a56fa9dac5c1ea50c4f481d8cc75b27eb64d474",
            "0xadefa3fa449be98a312396708b4bc671a7f9c3b2",
            "0x24e23ce29510a4ef1bf1783a7ac8e1de2fad38f3"
        ]
    
    var UmbrHoldersAmounts =
        [
            100.01, //Oskii Account 1
            400.678063,
            41892.372300,
            4076.017530,
            1927.473671,
            1364.609840,
            929.056112,
            897.283911,
            790.699112,
            707.556033,
            396.900602,
            270.653691,
            178.288555,
            165.793613,
            64.933556,
            30.683411,
            25.000000                                                    
        ]
    
    var UmbrLPHolders = 
        [
            accounts[0],   //Oskii Account 1
            accounts[1],
            "0x0524fe637b77a6f5f0b3a024f7fd9fe1e688a291",
            "0x4659fda24b3675bb18b2bf645703d0c344c0f665",
            "0xee0861fabedc0bd4e41fe9fe97e6cd1c7e4b717a",
            "0x1a56fa9dac5c1ea50c4f481d8cc75b27eb64d474",
            "0x674c962a0e8da3403851f4fc8dd166a28bc09ff5",
            "0xedbae069a2e6ba71882b629b9494de0ad3e57edb",
            "0xadefa3fa449be98a312396708b4bc671a7f9c3b2",
            "0x3517ec1d7fe5e46c4d61fec0e59ee12808a3aedf"
        ]
    
    var UmbrLPHoldersAmounts =
        [
            150.05,   //Oskii Account 1
            611.106892,
            147.128462,
            24.730841,
            20.446883,
            16.741276,
            11.796727,
            7.494830,
            3.985979,
            0.096313
        ]
    
    var UMBLRLpAirdropEntitlements = [];

    var UMBRAirdropEntitlements = [];
    
    var totalUMBRLPHoldings = 0;

    var totalUMBRHoldings = 0;

    console.log("\n\n======================= CALCULATING LP HOLDERS ENTITLEMENT RATIO =======================");
    console.log("\n");

    for (var i = 0; i < UmbrLPHoldersAmounts.length; i++)
    {
        totalUMBRLPHoldings += parseFloat(UmbrLPHoldersAmounts[i]);
        UmbrLPHoldersAmounts[i] = web3.utils.toWei(UmbrLPHoldersAmounts[i].toFixed(8));
    }

    var UMBRLpRatio = airdropLPAmount / web3.utils.toWei(totalUMBRLPHoldings.toString());
    console.log("The amount of UMBR given per UMBR-LP Token is " + UMBRLpRatio);

    console.log("\n\n======================= CONSTRUCTING ARRAY OF UMBR-LP HOLDERS ENTITLEMENTS =======================");
    console.log("\n");

    for (var i = 0; i < UmbrLPHoldersAmounts.length; i++)
    {
        let entitlementAmount = web3.utils.fromWei(UmbrLPHoldersAmounts[i]) * UMBRLpRatio;
        console.log("Entitlement for holder with " + web3.utils.fromWei(UmbrLPHoldersAmounts[i]) + " is " + entitlementAmount);
        UMBLRLpAirdropEntitlements[i] = parseFloat(entitlementAmount);
    }

    for (var i = 0; i < UmbrHoldersAmounts.length; i++)
    {
        totalUMBRHoldings += parseFloat(UmbrHoldersAmounts[i]);
        UmbrHoldersAmounts[i] = web3.utils.toWei(UmbrHoldersAmounts[i].toFixed(8));
    }

    console.log("\n\n======================= CALCULATING UMBR HOLDERS ENTITLEMENT RATIO =======================");
    console.log("\n");

    var UMBRRatio = airdropUMBRAmount / web3.utils.toWei(totalUMBRHoldings.toString());
    console.log("The amount of UMBR given per UMBR Token is " + UMBRRatio);

    console.log("\n\n======================= CONSTRUCTING ARRAY OF UMBR HOLDERS ENTITLEMENTS =======================");
    console.log("\n");

    for (var i = 0; i < UmbrHoldersAmounts.length; i++)
    {
        let entitlementAmount = web3.utils.fromWei(UmbrHoldersAmounts[i]) * UMBRRatio;
        console.log("Entitlement for holder with " + web3.utils.fromWei(UmbrHoldersAmounts[i]) + " is " + entitlementAmount);
        UMBRAirdropEntitlements[i] = parseFloat(entitlementAmount);
    }

    console.log("\n\n==============================================");

    console.log("Total UMBR LP Holdings is " + totalUMBRLPHoldings);
    console.log("Total UMBR Holdings is " + totalUMBRHoldings);
    
    console.log("\n\n======================= CONTRACT DEPLOYMENT =======================");
    console.log("\n");
    
    console.log("Deploying a new mock-umbria Token to test the airdrop functionality ... Eventually this will have to be changed to the actual mainnet UMBR token");
    //Create an ERC20 Token which we will airdrop later
    const MOCK_TOKEN = await MockERC20.new('MOCK', "MCK", web3.utils.toWei('5000000'));
    
    console.log("The mock umbria token was successfully deployed... at " + MOCK_TOKEN.address);
    
    totalUMBRHoldings = web3.utils.toWei(totalUMBRHoldings.toFixed(8));
    totalUMBRLPHoldings = web3.utils.toWei(totalUMBRLPHoldings.toFixed(8));

    console.log("Deploying the airdrop smart contract...");
    
    //Deploy the airdrop contract and set MOCK_TOKEN as the token we will be airdropping
    //constructor(ERC20 _airdropToken, uint256 _totalUMBRHoldings, uint256 _totalLPHoldings)
    await deployer.deploy(Airdrop, MOCK_TOKEN.address, web3.utils.toWei(totalUMBRHoldings), web3.utils.toWei(totalUMBRLPHoldings));

    var address_1_balance = await MOCK_TOKEN.balanceOf.call(accounts[0]);

    console.log("The Mock-UMBR balance of accounts[0] before transfering the UMBR token to the airdrop contract is " + web3.utils.fromWei(address_1_balance));
  
    const airdropInstance = await Airdrop.deployed(); 
    console.log("The airdrop smart contract was successfully deployed");
    console.log("Sending mock-umbria token to the airdrop contract...");

    //Mint some tokens and give them to the airdrop contract
    await MOCK_TOKEN.transfer(airdropInstance.address, web3.utils.toWei('5000000'));
    console.log("The mock-umbria token successfully minted " + 5000000 + " Mock-UMBR and sent them to the airdrop contract...");
    
    var balance = await MOCK_TOKEN.balanceOf.call(airdropInstance.address)
    console.log("The airdrop contract has a balance of " + web3.utils.fromWei(balance) + " Mock-UMBR...");
    

    var UMBRContractHoldings = await airdropInstance.getTotalUMBRHoldings();
    var UMBREthLpContractHoldings = await airdropInstance.getTotalUMBREthLpHoldings();
    
    console.log("The UMBR holdings of eligible airdrop participants is " + web3.utils.fromWei(UMBRContractHoldings));
    console.log("The UMBR-ETH Lp holdings of eligible airdrop participants is " + web3.utils.fromWei(UMBREthLpContractHoldings));

    /*
    * The following code will require users to claim the UMBR tokens themselves, within the airdrop.
    * each user will personally call the contract and pay the GAS fees for collecting their UMBR tokens
    */
    console.log("\n\n======================= UMBR HOLDERS AIRDROP =======================");
    console.log("\n");

    await airdropInstance.setTokenHoldersAirdrop(UmbrHolders, UmbrHoldersAmounts);
    console.log("Set UMBR holders list in the airdrop contract...");

    console.log("Attempting to see airdrop entitlement for " + accounts[0]);
    var UmbrAirdropEntitlement = await airdropInstance.seeUmbrAirdropEntitlement();
    console.log("The airdrop entitlement of " + accounts[0] + " is " + web3.utils.fromWei(UmbrAirdropEntitlement)) + " UMBR";
    console.log("\n")

    console.log("Checking whether the airdrop contract recognises that " + accounts[0] + " has not claimed the airdrop yet");
    var hasClaimedAirdrop = await airdropInstance.checkAlreadyClaimedUmbrAirdrop();
    console.log("Has " + accounts[0] + " claimed the airdrop yet? [0 No] [1 Yes]: " + hasClaimedAirdrop);
    console.log("\n");

    balance = await MOCK_TOKEN.balanceOf.call(accounts[0]);
    console.log("The UMBR balance of " + accounts[0] + " before the airdrop claim is " + web3.utils.fromWei(balance));


    console.log("Attempting to claim the airdrop for " + accounts[0]);

    await airdropInstance.claimUMBRAirdrop({from: accounts[0]});

    console.log("Successfully claimed airdrop...");

    balance = await MOCK_TOKEN.balanceOf.call(accounts[0]);

    console.log("The balance of " + accounts[0] + " after the airdrop claim is " + web3.utils.fromWei(balance));
    console.log("\n");

    console.log("Checking whether the airdrop contract recognises " + accounts[0] + " has indeed claimed the airdrop");

    hasClaimedAirdrop = await airdropInstance.checkAlreadyClaimedUmbrAirdrop();

    console.log("Has " + accounts[0] + " claimed the airdrop yet? [0 No] [1 Yes]: " + hasClaimedAirdrop);

    console.log("\n\n======================= UMBR-ETH LP HOLDERS AIRDROP =======================");
    console.log("\n");

    await airdropInstance.setLPHoldersAirdrop(UmbrLPHolders, UmbrLPHoldersAmounts);
    console.log("Set UMBR-ETH LP holders in the airdrop contract...");
    console.log("\n");

    console.log("Attempting to see airdrop entitlement for " + accounts[0]);
    var UmbrEthLpAirdropEntitlement = await airdropInstance.seeLPAirdropEntitlement();
    console.log("The airdrop entitlement of " + accounts[0] + " is " + web3.utils.fromWei(UmbrEthLpAirdropEntitlement)) + " UMBR";
    console.log("\n")

    console.log("Checking whether the airdrop contract recognises that " + accounts[0] + " has not claimed the airdrop yet");
    var hasClaimedUmbrEthLpAirdrop = await airdropInstance.checkAlreadyClaimedUmbrEthLpAirdrop();
    console.log("Has " + accounts[0] + " claimed the airdrop yet? [0 No] [1 Yes]: " + hasClaimedUmbrEthLpAirdrop);
    console.log("\n");

    balance = await MOCK_TOKEN.balanceOf.call(accounts[0]);
    console.log("The UMBR balance of " + accounts[0] + " before the UMBR-ETH LP airdrop claim is " + web3.utils.fromWei(balance));

    console.log("Attempting to claim the airdrop for " + accounts[0]);

    await airdropInstance.claimLPAirdrop({from: accounts[0]});

    console.log("Successfully claimed airdrop...");

    balance = await MOCK_TOKEN.balanceOf.call(accounts[0]);

    console.log("The balance of " + accounts[0] + " after the UMBR-ETH LP airdrop claim is " + web3.utils.fromWei(balance));
    console.log("\n");

    console.log("Checking whether the airdrop contract recognises " + accounts[0] + " has indeed claimed the UMBR-ETH LP airdrop");

    hasClaimedAirdrop = await airdropInstance.checkAlreadyClaimedUmbrEthLpAirdrop();


    console.log("\n\n======================= TRY DOUBLE CLAIM =======================");
    console.log("\n");

    console.log("Attempting to claim the airdrop a second time...");

    await airdropInstance.claimUMBRAirdrop();

    console.log("Successfully claimed the airdrop a second time");


};
