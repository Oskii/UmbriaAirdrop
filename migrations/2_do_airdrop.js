const Airdrop = artifacts.require("Airdrop");
const MockERC20 = artifacts.require("MockERC20");

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/89f762f8adbe4f819b574fc5c523d6ad');

module.exports = async function (deployer, network, accounts) {
    
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
            100.01,   //Oskii Account 1
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
    
    var totalUMBRLPHoldings = 0;

    for (var i = 0; i < UmbrLPHoldersAmounts.length; i++)
    {
        console.log(totalUMBRLPHoldings + " + " + UmbrLPHoldersAmounts[i] + " = " + (totalUMBRLPHoldings + parseFloat(UmbrLPHoldersAmounts[i])));
        totalUMBRLPHoldings += parseFloat(UmbrLPHoldersAmounts[i]);
        UmbrLPHoldersAmounts[i] = web3.utils.toWei(UmbrLPHoldersAmounts[i].toFixed(8));
    }

    console.log("===============================================");

    var totalUMBRHoldings = 0;

    for (var i = 0; i < UmbrHoldersAmounts.length; i++)
    {
        console.log(totalUMBRHoldings + " + " + UmbrHoldersAmounts[i] + " = " + (totalUMBRHoldings + parseFloat(UmbrHoldersAmounts[i])));
        totalUMBRHoldings += parseFloat(UmbrHoldersAmounts[i]);
        UmbrHoldersAmounts[i] = web3.utils.toWei(UmbrHoldersAmounts[i].toFixed(8));
    }

    console.log("After the loop, the type for totalUMBRHoldings is " + typeof totalUMBRHoldings);

    console.log("===============================================");
    
    //totalUMBRHoldings = totalUMBRHoldings.toFixed(6);
    //totalUMBRLPHoldings = totalUMBRLPHoldings.toFixed(6);

    console.log("Total UMBR LP Holdings is " + totalUMBRLPHoldings + " " + (typeof totalUMBRLPHoldings));
    console.log("Total UMBR Holdings is " + totalUMBRHoldings + " " + (typeof totalUMBRHoldings));
    
    
    console.log("Deploying a new mock-umbria Token to test an airdrop...");
    //Create an ERC20 Token which we will airdrop later
    const MOCK_TOKEN = await MockERC20.new('MOCK', "MCK", web3.utils.toWei('5000000'));
    
    console.log("The mock umbria token was successfully deployed... at " + MOCK_TOKEN.address);

    console.log("Deploying the airdrop smart contract...");

    console.log("The typeof value of totalUMBRHoldings is " + typeof totalUMBRHoldings + ": " + totalUMBRHoldings);

    console.log("The typeof value of totalUMBRLPHoldings is " + typeof totalUMBRLPHoldings + ": " + totalUMBRLPHoldings);

    console.log("Lets convert that to Wei... ");

    console.log("totalUMBRHoldings.toWei() = " + web3.utils.toWei(totalUMBRHoldings.toFixed(6)));

    console.log("totalUMBRLPHoldings.toWei() = " + web3.utils.toWei(totalUMBRLPHoldings.toFixed(6)));
    
    totalUMBRHoldings = web3.utils.toWei(totalUMBRHoldings.toFixed(6));
    totalUMBRLPHoldings = web3.utils.toWei(totalUMBRLPHoldings.toFixed(6));
    
    //Deploy the airdrop contract and set MOCK_TOKEN as the token we will be airdropping
    await deployer.deploy(Airdrop, MOCK_TOKEN.address, totalUMBRHoldings, totalUMBRLPHoldings);

    var address_1_balance = await MOCK_TOKEN.balanceOf.call(accounts[0]);
    var address_2_balance = await MOCK_TOKEN.balanceOf.call(accounts[1]);

    console.log("The Mock-UMBR balance of accounts[0] which we airdropped to is " + web3.utils.fromWei(address_1_balance));
    console.log("The Mock-UMBR balance of accounts[1] which we airdropped to is " + web3.utils.fromWei(address_2_balance));
  
    const airdropInstance = await Airdrop.deployed(); 
    console.log("The airdrop smart contract was successfully deployed");

    console.log("Sending mock-umbria token to the airdrop contract...");
    console.log("The airdrop contract's address is " + airdropInstance.address);

    //Mint some tokens and give them to the airdrop contract
    await MOCK_TOKEN.transfer(airdropInstance.address, web3.utils.toWei('5000000'));
    console.log("The mock-umbria token successfully minted " + 1000000 + " Mock-UMBR and sent them to the airdrop contract...");
    
    var balance = await MOCK_TOKEN.balanceOf.call(airdropInstance.address)
    console.log("The airdrop contract has a balance of " + web3.utils.fromWei(balance) + " Mock-UMBR...");
    
    /*
    * The following code will airdrop an amount of UMBRIA to a list of recipients as defined in
    * this deployment code. The airdrop will cost GAS for the deployer, but will airdrop
    * the correct and equal amount of tokens to each of the specified recipients
    */
    
    var recipients =
        [
            accounts[0],   //Ganache Account 1
            accounts[1]    //Ganache Account 2
        ]

    //console.log("Initiating an airdrop to recipient accounts[0]..." + accounts[0]);
    //await airdropInstance.claimUMBRAirdrop({ from: accounts[0] });
    
    //console.log("Initiating an airdrop to recipient accounts[1]..." + accounts[1]);
    //await airdropInstance.claimUMBRAirdrop({ from: accounts[1] });
    
    //console.log("Airdrop successfully completed to two addresses...");

    address_1_balance = await MOCK_TOKEN.balanceOf.call(accounts[0]);
    address_2_balance = await MOCK_TOKEN.balanceOf.call(accounts[1]);
    
    console.log("The Mock-UMBR balance of accounts[0] moments before airdrop is " + web3.utils.fromWei(address_1_balance));
    console.log("The Mock-UMBR balance of accounts[1] moments before airdrop is " + web3.utils.fromWei(address_2_balance));

    balance = await MOCK_TOKEN.balanceOf.call(airdropInstance.address);
    console.log("The airdrop contract balance of MOCK_TOKEN now is " + web3.utils.fromWei(balance));
    
    
    /*
    * The following code will require users to claim the UMBR tokens themselves, within the airdrop.
    * each user will personally call the contract and pay the GAS fees for collecting their UMBR tokens
    */
    

    console.log("Setting UMBR holders in the airdrop contract, based on snapshot");
    await airdropInstance.setTokenHoldersAirdrop(UmbrHolders, UmbrHoldersAmounts);

    console.log("Setting UMBR-ETH LP holders in the airdrop contract, based on snapshot");
    await airdropInstance.setLPHoldersAirdrop(UmbrLPHolders, UmbrLPHoldersAmounts);

    console.log("The address of the deployer = " + accounts[0]);

    console.log("Attempting to access the airdrop of " + accounts[0]);
    var UmbrAirdropEntitlement = await airdropInstance.seeUmbrAirdropEntitlement();

    console.log("The airdrop entitlement of the deployer is " + web3.utils.fromWei(UmbrAirdropEntitlement));

    console.log("Checking whether the airdrop contract recognises " + accounts[0] + " has not claimed the airdrop yet");

    var hasClaimedAirdrop = await airdropInstance.checkAlreadyClaimedUmbrAirdrop();

    console.log("The result of the check: " + hasClaimedAirdrop);

    console.log("Attempting to claim the airdrop using " + accounts[0]);

    await airdropInstance.claimUMBRAirdrop({from: accounts[0]});

    console.log("Successfully made a token allowance to " + accounts[0]);

    balance = await MOCK_TOKEN.balanceOf.call(accounts[0]);

    console.log("The balance of accounts[0] is " + balance);

    console.log("Checking whether the airdrop contract recognises " + accounts[0] + " has indeed claimed the airdrop");

    hasClaimedAirdrop = await airdropInstance.checkAlreadyClaimedUmbrAirdrop();

    console.log("The result of the check: " + hasClaimedAirdrop);
    
    console.log("Attempting to remove the coins that were claimed, and send them to self");

    //await airdropInstance.claimUMBRAirdrop();

    //balance = await MOCK_TOKEN.balanceOf.call(accounts[0]);

    //console.log("The balance of accounts[0] is " + balance);

    //console.log("Attempting to claim the airdrop a second time");

    //await airdropInstance.claimUMBRAirdrop();

    //console.log("Successfully claimed the airdrop a second time");


};