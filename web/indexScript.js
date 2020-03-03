function setValue() {
    console.log("AHA4");
    // TODO: Call setBalance Smart Contract
    // addStatusLine("called");
    _sensorid = parseInt(document.getElementById('pm').value);
    _pm1 = parseInt(document.getElementById('pm').value);
    _pm2 = parseInt(document.getElementById('pm').value);
    _pm10 = parseInt(document.getElementById('pm').value);

    console.log("AHA5");
    //newPm = 52;
    //SimpleContract is name of Remix IDE solidity file
    SimpleContract.writeInArrayPm(_sensorid,_pm1,_pm2,_pm10, function (error, result) {
        console.log("AHA6");
        if (error) {
            
            console.log("newPm is error!");
            return;
        }
        console.log("AHA7");
        _sensorid,_pm1,_pm2,_pm10 = result;
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
function changeData (text) {
  console.log("using Func changedata");
  // console.log(text);
var params = text;
  console.log("param is " + typeof params);
  console.log(params);

   //before [{'id':9,'pm1':12.29,'pm2':12.56,'pm10':12.56}] 
var subParams = params.substr(2, params.length - 4 );
   //after  'id':9,'pm1':12.29,'pm2':12.56,'pm10':12.56
   
   //var replace = subParams.replace(/'/gi,'"');
   // '' --> " " == id:9,pm1:12.29,pm2:12.56,pm10:12.56
   // var replaceArray = replace.replace(/"|:/gi,' ');
   // id  9, pm1  12.29, pm2  12.56, pm10  12.56
  
    var initial_arr_objects = subParams.split(",");
    var objects =[];
        initial_arr_objects.map((e) => {
        var string = e;
        var fields = string.split(':'),fieldObject = [];
        
            if( typeof fields === 'object') {
            fields.forEach(function(field) {
                fieldObject[fields[0]] = fields[1]; //use parseInt if integer wanted
            });
            }
         
        //var obj = fieldObject;
        //get value of "id":9 --> "9"
        var obj = Object.values(fieldObject);

        objects.push(obj);
       //push value into Array
    });

    console.log(objects);
      document.getElementById("temp").innerHTML = "<a>"+ objects[0] +"</a>"
      document.getElementById("moisture").innerHTML = "<a>"+ objects[1] +"</a>";
      document.getElementById("rain").innerHTML = "<a>"+ objects[2] +"</a>";
      document.getElementById("pm").innerHTML = "<a>"+ objects[3] +"</a>";
 }
 /*   var obj = text;
   var showdata = Object.values(obj); 
  
   // const objectArray = Object.entries(text);
    document.getElementById("temp").innerHTML = "<a>"+ showdata[0] +"</a>";
    document.getElementById("moisture").innerHTML = "<a>"+ showdata[1] +"</a>";
    document.getElementById("rain").innerHTML = "<a>"+ showdata[2] +"</a>";
    document.getElementById("pm").innerHTML = "<a>"+ showdata[3] +"</a>";

    console.log("showdata is " + typeof showdata);
    console.log("showdata " + showdata);   
} */

//MUSH ❤ function Get deta
function getBalance() {
    // showdata
    //TODO: Call getBalance Smart Contract
    //SimpleContract is name of Remix IDE solidity file
    SimpleContract.ReadInArraypm(function (errorGet, resultGet) {
        //resultGet is Data in block
       // changeData(resultGet); 
        console.log("using Func getBalance");
        console.log(resultGet);
      //  console.log(typeof resultGet +" is resultGet")

    });
   
}
//MUSH ❤ function Set deta to new
function setBalance() {
    // TODO: Call setBalance Smart Contract
    // addStatusLine("called");
    newBalance = parseInt(document.getElementById('newBalance').value);
    //addStatusLine(newBalance);
    //SimpleContract is name of Remix IDE solidity file
    SimpleContract.writeInArrayPm(newBalance, function (error, result) {
        if (error) {
            addStatusLine(error);
            return;
        }
console.log(result);
       // addStatusLine("");
       // addStatusLine("calling setBalance(" + newBalance + ")");
       // txHash = result;
       // addStatusLine("TxHash = <a href='http://23.97.51.51:8545/" +
       // result + "' target='_blank'>" + result + "</a>");
    });
}

// web3 = Web3j.build(new HttpService("https://ropsten.infura.io/"));
// web3ClientVersion = web3.web3ClientVersion().send();
//System.out.println(web3ClientVersion.getWeb3ClientVersion());
//var web3 = window.web3;
// if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
  //  } else {
    // set the provider you want from Web3.providers
   
 //   web3 = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/88b411023d86490d91ca5d75cbbd1cf5");
//  } 
// Get default address
//web3.eth.defaultAccount="0x3D38b72702Bb977a449A8d7C6D8a1E864c2C1fF9"
web3.eth.defaultAccount = web3.eth.accounts[0];
// TODO: Replace your SimpleContract contract address here

//contract Address Code
//1. 0xb2926accd55F92783Ee697aD25f898EE4821327f
//2. 0xc872E1fB43e10b168B62898f5FaB609058E6A42A using each string in array
//3. 0x898a13f21C645190d98517e75EDa3c0D969FEbC9 
//4. 0x2dbABd86DA707b552950088bABropsten.infura.io/v3/88b411023d86490d91ca5d75cbbd1cf52136C39eb9E370 [{'id':'9','pm1':'12.29','pm2':'12.56','pm10':'12.56'}]
//5. 0xDbf1FBB4f42D0770d16eA6234EB3c447640d3AE7  Thaicha [{'id':10,'pm1':14.68,'pm2':12.56,'pm10':15.85}]
//6. 0x49E281D2f91D9C8C4Bf27c7ed197F28E09bdE1A5  Thaicha [{'id':B,'pm1':0.55,'pm2':555,'pm10':0.55}]
//7. 0xE1d5dB69aB9FD10aA7D1C87d428f7394d4C1e774  Thaicha [{'id':9,'pm1':12.29,'pm2':12.56,'pm10':12.56}] 
//8. 0xd7ba73dd6b7f2f3dce362ed27801b015266229b0  robsten [{'id':A'pm1':0.22,'pm2':222,'pm10':0.22}]          -------failed------
//9. 0x2263e16f3163f064b25dab8268174bfb87385776  robsten [{'id':12.35,'pm1':11.0,'pm2':175,'pm10':85}]
//10 0x230E89F94545C967fF006481cF38650d7bD16ee0
//0x634cc47c48E38B65167De9BcA72E1AE466aC0A41   address
//0x00209ee945Bb1e6524F700A02cC7b7F4A31eCd7F string lastest


// TODO: Replace your SimpleContract abi here
var abi = //5,6
/*[
    {
        "constant": true,
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]*/
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

//0x2263e16f3163f064b25dab8268174bfb87385776
//0xdbf1fbb4f42d0770d16ea6234eb3c447640d3ae7
var contractAddress = "0x4572453fa0fc6c818089582bb69cf4ec7c5c93e8";
/*function callAddress() {
    // showdata
    //TODO: Call getBalance Smart Contract
    //SimpleContract is name of Remix IDE solidity file
    SimpleContract.callAddress(function (errorGet, resultGet) {
        //resultGet is Data in block
       // changeContract(resultGet); 
        console.log("using Func callAddress");
        console.log("address is " + typeof resultGet);
       
        //contractAddress = resultGet;
        console.log(resultGet);
    });
}*/
// Create an interface to SimpleContract on TomoChain
var SimpleContractContract = web3.eth.contract(abi,contractAddress);
var SimpleContract = SimpleContractContract.at(contractAddress);
    // Get Balance on the first load
    //callAddress();
    getBalance();

   // web3.eth.getAccounts().then(console.log);
///////////////////////////////////////////////////////////metamask script////////////////////////////////////////////////////////



