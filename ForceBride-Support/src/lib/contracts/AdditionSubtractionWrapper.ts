import Web3 from 'web3';
import * as AdditionSubtractionJSON from '../../../build/contracts/AdditionSubtraction.json';
import { AdditionSubtraction } from '../../types/AdditionSubtraction';

const DEFAULT_SEND_OPTIONS = {
    gas: 6000000
};

export class AdditionSubtractionWrapper {
    web3: Web3;

    contract: AdditionSubtraction;

    address: string;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.contract = new web3.eth.Contract(AdditionSubtractionJSON.abi as any) as any;
    }

    get isDeployed() {
        return Boolean(this.address);
    }

    async showValue(fromAddress: string) {
        const data = await this.contract.methods.show().call({ from: fromAddress });

        return parseInt(data, 10);
    }

    async addValue(value: number, fromAddress: string) {
        const tx = await this.contract.methods.add(value).send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress,
            value
        });

        return tx;
    }

    async subtractValue(value: number, fromAddress: string) {
        const tx = await this.contract.methods.subtract(value).send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress,
            value
        });

        return tx;
    }

    async clearValue(value: number, fromAddress: string) {
        const tx = await this.contract.methods.clear().send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress,
            value
        });

        return tx;
    }

    async deploy(fromAddress: string) {
        const tx = this.contract
            .deploy({
                data: AdditionSubtractionJSON.bytecode,
                arguments: []
            })
            .send({
                ...DEFAULT_SEND_OPTIONS,
                from: fromAddress
            });

        let transactionHash: string = null;
        tx.on('transactionHash', (hash: string) => {
            transactionHash = hash;
        });

        const contract = await tx;

        this.useDeployed(contract.options.address);

        return transactionHash;
    }

    useDeployed(contractAddress: string) {
        this.address = contractAddress;
        this.contract.options.address = contractAddress;
    }
}
