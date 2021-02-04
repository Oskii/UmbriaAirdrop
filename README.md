# UmbriaAirdrop

Airdrop solidity contracts and migrations code, for early Umbria and Umbria-ETH LP holders.

This set of contracts and its respective migrations code is designed to be tested by the community, before deployment. This is for two reasons:

<ul>
   <li>A) Transparency of operations - the community should know how the aidrop is being deployed</li>
   <li>B) Auditing - maybe there is a mistake in the code that you can spot?</li>
</ul>
<hr>
<h3>Getting started</h3>
<p>I used <a href="https://www.trufflesuite.com/docs/truffle/getting-started/installation">Truffle</a>, <a href="https://www.trufflesuite.com/docs/ganache/quickstart">Ganache</a> and <a href="https://code.visualstudio.com/">VSCode</a> for this deployment</p>
<hr>
<h3>Setting up truffle</h3>
<code>npm install -g truffle</code>
<br>
<h5>Creating a new truffle project</h5>
<code>truffle init</code>
<br>
<p>After that, you can replace the contracts and migrations folders from this project into your project</p>
<h5>Your truffle config should look something like this</h5>
<pre>
module.exports = {
   networks: {
     test: {
       host: "127.0.0.1",
       port: 7545,
       network_id: 5777,
     },    
   },
   compilers: {
     solc: {
       version: "0.7.4",
       settings: {
         optimizer: {
           enabled: true,
           runs: 9999, // Optimize for how many times you intend to run the code
         },
       },
     },
   },
 };
</pre>
<hr>
<h3>Setting up Ganache</h3>
<h5>Start by <a href="https://www.trufflesuite.com/docs/ganache/quickstart">Downloading Ganache</a></h5>
<ul>
   <li>Open Ganache</li>
   <li>Press the QUICKSTART button</li>
   <li>Make sure the <b>NETWORK ID</b> and <b>RPC SERVER</b> values in the GUI match your truffle config</li>
   <li>You can configure both <b>NETWORK ID</b> and <b>RPC SERVER</b> in the Ganache settings (Gear Icon) </li>
</ul>
<hr>
<h3>Deploying the Airdrop Contracts, and Testing Their Functionality</h3>
<p>The contract deployment occurs in two phases:</p>
<ol>
  <li><code>1_initial_migration.js</code> runs first. This code does very little, it pretty much just records the time of deployment on the blockchain.</li>
  <li><code>2_do_airdrop.js</code> runs second. This code deploys the airdrop contract and all supporting contracts for executing the airdrop. Add your own deployments, tests etc to this deployment.</li>
</ol>
<hr>
<h3>Expected Results</h3>
The airdrop contracts are expected to have the following functionality:
<ul>
   <li>✔️ <code>msg.sender</code> should be able to set a list of UMBR holders and their respective balances after March 1st</li>
   <li>✔️ <code>msg.sender</code> should be able to set a list of UMBR-ETH LP (Uniswap LP Token) holders and their respective balances after March 1st</li>
   <li>✔️ Anyone should be able to see their wallet's UMBR or UMBR-ETH LP balance at the time of the snapshot. If they had a balance of 0, the contract should throw an error</li>
   <li>✔️ The contract should store a mapping of users who have claimed the airdrop based on holding UMBR</li>
   <li>✔️ The contract should store a mapping of users who have claimed the airdrop based on holding UMBR-ETH LP</li>
   <li>✔️ The contract should throw an error if a user tries to double-claim</li>
   <li>⌛ The contract should store an amount of UMBR</li>
   <li>⌛ Airdrop amount should be contigent on UMBR/LP Balance vs Airdrop Max Supply </li>
   <li>⌛ The contract should allow users to claim using UMBR-ETH LP snapshot balance</li>
   <li>⌛ The contract should allow users to claim using UMBR snapshot balance</li>
   <li>✔️ The contract should emit an Airdrop even whenever a user claims</li>
</ul>
