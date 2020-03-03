var tokenc20Contract = web3.eth.Contract([{"constant":true,"input":[],"name":"name","outputs":
var tokenner20 = tokenc20Contract.new(
    {
        from:web3.eth.accounts[0],
        data: '',
        gas:'4700000'
    }, function (e,constract){
        console.log(e, contract);
        if (typeof contract.address !== 'undifined') {
            console.log('COntract mind! address: '+ constract.address + 'transactionHash: '+ constract.transactionHash)
        }
    }
)


}])