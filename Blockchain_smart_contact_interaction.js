import web3 from 'web3';
 class BlockchainInterface {
    constructor (contractABI, contractAddress){
        this.contractABI = contractABI;
        this.contractAddress = contractABI;
        this.web3 = null;
        this.contract = null;
        this.account = null;
    }

    async connect () {
        if (window.ethereum) {
            try {
                await window.ethereum.enable();
                this.web3 = new web3(window.ethereum);

                const accounts = await this.web3.eth.getAccounts();
                this.account = accounts[0];

                this.contract = new this.web3.eth.Contract
                (
                    this.contractABI,
                    this.contractAddress
                );

                return true;
            } catch (error) {
                console.error('User denied account access');

                return false;
            }
        }

        else if (window.web3) {
            this.web3 = new web3(window.web3.currentProvider);
            return true;
        }

        else {
            console.log('Non-Ethereum browser detected Consider using MetaMask!');
            return false;
        }
    }

    async
 }