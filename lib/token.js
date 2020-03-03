const Web3 = require('web3')
const path = require('path')
const cjson = require('cjson')
const TX = require('ethereumjs-tx')
// contract details
const provider = 'https://ropsten.infura.io/v3/88b411023d86490d91ca5d75cbbd1cf5'    //change
const contractAddress = '0xdbf1fbb4f42d0770d16ea6234eb3c447640d3ae7'                //change
const privateKey = new Buffer('E2431BB712D82FDC8F8E5F86D052B3F19AE8076E3B506FF0AECE38C84443E32C', 'hex')   //change
const defaultAccount = '0x3D38b72702Bb977a449A8d7C6D8a1E864c2C1fF9'     //change
const etherscanLink = 'https://ropsten.etherscan.io/tx/'                //change
// initiate the web3
const web3 = new Web3(provider)
// initiate the contract with null value
var contract = null;
// convert Wei to Eth
function convertWeiToEth( stringValue ) {
 if ( typeof stringValue != 'string' ) {
 stringValue = String( stringValue );
 }
 return web3.utils.fromWei( stringValue, 'ether' );
}
// Initiate the Contract
function getContract() { 
 if (contract === null) {
 var abi = cjson.load(path.resolve(__dirname, '../abi/abi.json'));        //change ABI  and get in to folder
 var c = new web3.eth.Contract(abi,contractAddress)                       //contractAddresss on above
 contract = c.clone();
 }
 console.log('Contract Initiated successfully!')
 return contract;
}
// send token to Address
async function sendToken(req, res) {
 var address = req.body.address
 var tokens = Number(req.body.tokens)
if (address && tokens) {
 const rawTrans = getContract().methods.send(address, tokens)           // contract method 
 return res.send(await sendSignTransaction(rawTrans))
 } else {
 res.send({
 'message':'Wallet address or no. of tokens is missing.'
 })
 }
}
// Mint Create token to given address
async function mintToken(req, res) {
 var address = req.body.address
 var tokens = Number(req.body.tokens)
if (address && tokens) {
 const rawTrans = getContract().methods.mint(address, tokens) // contract method 
 return res.send(await sendSignTransaction(rawTrans))
 } else {
 res.send({
 'message':'Wallet address or no. of tokens is missing.'
 })
 }
}
// get the balance of given address
async function getBalance(req, res) {
 var address = req.query.address
 if (address) {
 // get the Ether balance of the given address
 var ethBalance = convertWeiToEth( await web3.eth.getBalance(address)) || '0'
// get the token balance of the given address
 var tokenBalance = await getContract().methods.balances(address).call() || '0'
// response data back to requestor
 return res.send({
 'Ether Balance': ethBalance,
 'Token Balance': tokenBalance
 })
 } 
}
///////////////////////////////////////////////////////////////////////////////////////////
async function getData() {
    var address = req.query.address
    if (address){
         // showdata
    //TODO: Call getBalance Smart Contract
    //SimpleContract is name of Remix IDE solidity file
        SimpleContract.getBalance(function (errorGet, resultGet) {
            //resultGet is Data in block
            console.log("using Func getBalance");
            console.log(resultGet);
    });
    return res.send({
        'DATA': resultGet,
    })
  }
}
///////////////////////////////////////////////////////////////////////////////////////////
// Send Signed Transaction
async function sendSignTransaction(rawTrans) {
 // Initiate values required by the dataTrans
 if (rawTrans) {
 var txCount = await web3.eth.getTransactionCount(defaultAccount) // needed for nonce
 var abiTrans = rawTrans.encodeABI() // encoded contract method 
 
 var gas = await rawTrans.estimateGas()
 var gasPrice = await web3.eth.getGasPrice()
 gasPrice = Number(gasPrice)
 gasPrice = gasPrice * 2
 var gasLimit = gas * 4
// Initiate the transaction data
 var dataTrans = {
 nonce: web3.utils.toHex(txCount),
 gasLimit: web3.utils.toHex(gasLimit),
 gasPrice: web3.utils.toHex(gasPrice), 
 to: contractAddress,
 data: abiTrans 
 }
 
 // sign transaction
 var tx = new TX(dataTrans)
 tx.sign(privateKey)
// after signing send the transaction
 return await sendSigned(tx)
 } else {
 throw new console.error('Encoded raw transaction was not given.');
 }
}
function sendSigned(tx) {
 return new Promise(function(resolve,reject){
 // send the signed transaction
 web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
 .once('transactionHash', function(hash){
 var result = {
 'status':'sent',
 'url': etherscanLink + hash,
 'message':'click the given url to verify status of transaction'
 }
// respond with the result
 resolve(result)
 })
 .then(out => {console.log(out)})
 .catch(err => {
 // respond with error
 reject(err)
 })
 })
}
module.exports = {
 send: sendToken,
 mint: mintToken,
 balance: getBalance,
 data:getData
}