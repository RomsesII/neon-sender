import React, {useState} from 'react';
import {IAdressAndCount} from "../pages/MainPage"
import Web3 from "web3";
import {AddressesStyles} from "../styles/AddressesStyles";


interface IAddressesProps {
    receivers: IAdressAndCount[],
    setReceivers: (value: IAdressAndCount[] | ((prevState: IAdressAndCount[]) => IAdressAndCount[])) => void;
    web3: Web3 | null
}


export const Addresses = ({receivers, setReceivers, web3}: IAddressesProps) => {

    const [parsedState, setParsedState] = useState<string>('')

    const onChangeAddressList = (e: React.FormEvent<HTMLTextAreaElement>) => {

        setReceivers([])
        if (web3) {
            const state = (String(e.currentTarget.value))
            setParsedState(state)
            const parsedLines = state.split("\n");
            for (const array of parsedLines ?? []) {
                const parsed = array.split(' ')
                const address = parsed[0]
                const validAddress = web3.utils.isAddress(address)
                if (validAddress) {
                    const count = parsed[1]
                    setReceivers((prevState: IAdressAndCount[]) => [...prevState, {address: parsed[0], count: count}])
                }
            }
        }
    };
    return <div className={AddressesStyles.textAreaBlock}>
        <div className={AddressesStyles.name}>Enter recipient addresses</div>
        <div className={AddressesStyles.instruction}>
            To continue, enter the recipient addresses and the number of tokens according to the example
        </div>
        <textarea className={AddressesStyles.textArea} value={parsedState}
                  placeholder={'Example:\n0x280c31e013A10f46894631b6b391B69e63cF404e 12.5\n0x0ddfaC076480c7f89127D8026ef36D5294DE2949 20'}
                  onChange={onChangeAddressList}></textarea>
    </div>
}