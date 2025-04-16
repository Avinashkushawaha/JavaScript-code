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

    async getBalance(){
        if(!this.contract) throw new Error('Not connected to contract');
        return this.contract.methods.getBalance().call({from: this.account });
    }

    async deposit(amount) {
        if (!this.contract) throw new Error('Not Connected to contract');
        const weiAmount = this.web3.utils.toWei(amount.toString(), 'either');

        return this.contract.methods.deposit().send({
            from: this.account,
            value: weiAmount
        });
    }

    async withdraw(amount) {
        if (!this.contract) throw new Error('Not connected to contract')
            const weiAmount = this.web3.utils.toWei(amount.toString(), 'either');

        return this.contract.methods.withdraw(weiAmount).send({
            from: this.account
        });
    }

    onBalanceChange(callback) {
        if (!this.contract) throw new Error('Not connected to contract');
        this.contract.events.BalanceChanged({ fromBlock: 'latest' })
        .on('data', event => callback(event.returnValues.newBalance))
        .on('error', console.error);
    } 
 }