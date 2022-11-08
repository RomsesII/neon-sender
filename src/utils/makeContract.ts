import Web3 from "web3";
import {AbiItem} from "web3-utils";
import {Contract} from "web3-eth-contract";

export function makeContract(
    web3: Web3,
    contractAddress: string,
    abi: AbiItem[]
): Contract {
    return new web3.eth.Contract(abi, contractAddress);
}
