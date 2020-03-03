//must require for use 
const bodyParser = require('body-parser');
const express = require('express');
var Tx = require('ethereumjs-tx');//
const Web3 = require('web3');  //
const path = require('path');
const fs = require('fs');
const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider("ropsten.infura.io/v3/88b411023d86490d91ca5d75cbbd1cf5"));


function setValue() {
    // TODO: Call setBalance Smart Contract
    // addStatusLine("called");
    nextID = parseInt(document.getElementById('pm').value);
    //newPm = 52;
    //SimpleContract is name of Remix IDE solidity file
    SimpleContract.writeInArrayPm(nextID, function (error, result) {
        if (error) {
            console.log("newPm is error!");
            return;
        }
        nextID = result;
        console.log(result);
        txHash = result;
       // addStatusLine("TxHash = <a href='http://23.97.51.51:8545/" +
    });
}

function getValue() {
    //TODO: Call getBalance Smart Contract
    //SimpleContract is name of Remix IDE solidity file
    SimpleContract.ReadInArraypm(function (errorGet, resultGet) {
        //resultGet is Data in block
       // changeData(resultGet); 
        if (errorGet) {
            console.log("gatValue is error!");
        return;
        }   
        console.log("using Func getBalance");
        console.log(resultGet);
        console.log(typeof resultGet +" is resultGet")
    });
   
}

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider); // inject from Metamask plugin
  }

/* if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
      } else {
      // set the provider you want from Web3.providers
      console.log("please set providers");
      web3 = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/88b411023d86490d91ca5d75cbbd1cf5");
    }  */
  // Get default address
  web3.eth.defaultAccount="0x3D38b72702Bb977a449A8d7C6D8a1E864c2C1fF9"
  //web3.eth.defaultAccount = web3.eth.accounts[0];
  // TODO: Replace your SimpleContract contract address here
  var contractAddress = "0x4572453fa0fc6c818089582bb69cf4ec7c5c93e8";
  
  // TODO: Replace your SimpleContract abi here
  var abi = 

  [
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_sensorid",
                  "type": "uint256"
              },
              {
                  "name": "_pm1",
                  "type": "uint256"
              },
              {
                  "name": "_pm2",
                  "type": "uint256"
              },
              {
                  "name": "_pm10",
                  "type": "uint256"
              }
          ],
          "name": "writeInArrayPm",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_rain",
                  "type": "uint256"
              },
              {
                  "name": "_humidity",
                  "type": "uint256"
              },
              {
                  "name": "_temp",
                  "type": "uint256"
              }
          ],
          "name": "writeInArrayWeather",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [],
          "name": "nextIdpm",
          "outputs": [
              {
                  "name": "",
                  "type": "uint256"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [],
          "name": "nextIdwt",
          "outputs": [
              {
                  "name": "",
                  "type": "uint256"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [],
          "name": "ReadInArraypm",
          "outputs": [
              {
                  "components": [
                      {
                          "name": "sensorid",
                          "type": "uint256"
                      },
                      {
                          "name": "pm1",
                          "type": "uint256"
                      },
                      {
                          "name": "pm2",
                          "type": "uint256"
                      },
                      {
                          "name": "pm10",
                          "type": "uint256"
                      }
                  ],
                  "name": "",
                  "type": "tuple[]"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [],
          "name": "ReadInArrayweather",
          "outputs": [
              {
                  "components": [
                      {
                          "name": "rain",
                          "type": "uint256"
                      },
                      {
                          "name": "humidity",
                          "type": "uint256"
                      },
                      {
                          "name": "temp",
                          "type": "uint256"
                      }
                  ],
                  "name": "",
                  "type": "tuple[]"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [
              {
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "sensor_pm",
          "outputs": [
              {
                  "name": "sensorid",
                  "type": "uint256"
              },
              {
                  "name": "pm1",
                  "type": "uint256"
              },
              {
                  "name": "pm2",
                  "type": "uint256"
              },
              {
                  "name": "pm10",
                  "type": "uint256"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [
              {
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "sensor_weather",
          "outputs": [
              {
                  "name": "rain",
                  "type": "uint256"
              },
              {
                  "name": "humidity",
                  "type": "uint256"
              },
              {
                  "name": "temp",
                  "type": "uint256"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      }
  ]
  
 
  // Create an interface to SimpleContract on TomoChain
  var SimpleContractContract = web3.eth.contract(abi,contractAddress);
  var SimpleContract = SimpleContractContract.at(contractAddress);
  //setValue();   
  //getValue();