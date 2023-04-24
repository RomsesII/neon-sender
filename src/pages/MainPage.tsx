import React, {useEffect, useState} from 'react';
import {ConnectorHeader} from "../components/ConnectorHeader";
import {MainPageStyles} from "../styles/MainPageStyles";
import {SelectToken} from "../components/SelectToken";
import {Addresses} from "../components/Addresses";
import {Contract} from "web3-eth-contract";
import Web3 from "web3";
import senderAbi from "./../constants/senderAbi.json"
import erc20Abi from "./../constants/erc20Abi.json"
import {AbiItem} from "web3-utils";
import {makeContract} from "../utils/makeContract";
import {showNotify} from "../utils/showNotify";
import {tokensList} from "../constants/tokensList";
import {Button} from "../components/Button";


export interface IAdressAndCount {
    address: string;
    count: string;
}

const SENDER_CONTRACT_ADDRESS = '0x3a2accc09878fd4d8b3b82c404874bbdaeb766ca'
export const INNER_COIN = 'neon'
const forPermit = "100000000000000000000000000000000000000000000000000000000000"

export const MainPage = () => {

    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [account, setAccount] = useState<string>("")
    const [senderContract, setSenderContract] = useState<Contract | null>(null);
    const [erc20Contract, setErc20Contract] = useState<Contract | null>(null)
    const [validChain, setValidChain] = useState<boolean>(false)
    const [receivers, setReceivers] = useState<IAdressAndCount[]>([])
    const [tokenAddress, setTokenAddress] = useState<string>('')
    const [tokenPermission, setTokenPermission] = useState<boolean>(false)
    const [senderLoading, setSenderLoading] = useState<boolean>(false)
    const [permissionLoading, setPermissionLoading] = useState<boolean>(false)
    const [checkPermissionLoading, setCheckPermissionLoading] = useState<boolean>(false)
    const [tokenBalance, setTokenBalance] = useState<number>(0)

    const windowEthereum = (window as any).ethereum;

    const reset = () => {
        setTokenAddress('')
        setTokenPermission(false)
        setTokenBalance(0)
        setReceivers([])
    }


    const checkPermission = async () => {
        setCheckPermissionLoading(true)
        setTokenPermission(false)
        if (tokenAddress && web3) {
            const tokenObject = tokensList.find((x) => x.address === tokenAddress)
            if (tokenAddress === INNER_COIN) {
                setTokenPermission(true)
                const balance = await web3?.eth?.getBalance(account)
                setTokenBalance(Number(balance) * tokenObject?.factor! || 0)
            } else {
                const erc20Contract = makeContract(
                    web3,
                    tokenAddress,
                    JSON.parse(erc20Abi.result) as AbiItem[]
                );
                setErc20Contract(erc20Contract)
                const check =
                    await erc20Contract.methods
                        .allowance(account, SENDER_CONTRACT_ADDRESS)
                        .call()
                const balance = await erc20Contract?.methods.balanceOf(account).call()
                setTokenBalance(balance * tokenObject?.factor! || 0)
                if (Number(check) > 0) {
                    setTokenPermission(true)
                }
            }

        }
        setCheckPermissionLoading(false)
    }

    const addPermission = async () => {
        if (account && web3 && tokenAddress && tokenAddress !== INNER_COIN && !tokenPermission && erc20Contract) {
            setPermissionLoading(true)
            try {
                await erc20Contract.methods
                    .approve(SENDER_CONTRACT_ADDRESS, web3.utils.toWei(forPermit, "ether"))
                    .send({from: account});
                await checkPermission()
                setPermissionLoading(false)
            } catch {
                setPermissionLoading(false)
                showNotify({
                    title: "Error",
                    message: "You need to give permission",
                    type: "danger",
                });
            }
        }
    }

    const multisend = async () => {
        try {
            setSenderLoading(true)
            if (senderContract && tokenAddress && web3 && receivers.length !== 0) {
                const addresses = []
                const counts = []
                for (const addressInfo of receivers) {
                    addresses.push(addressInfo.address)
                    counts.push(addressInfo.count)
                }
                if (tokenAddress === INNER_COIN) {
                    await senderContract.methods.InnerCoinTransfer(addresses, counts.map(x => web3.utils.toWei(x, "ether"))).send({
                        from: account,
                        value: web3.utils.toWei((counts.map((x) => Number(x)).reduce((x, y) => x + y).toString()), "ether")
                    })
                    showNotify({
                        title: "Success",
                        message: "Transaction completed successfully",
                        type: "success",
                    });
                    reset()
                } else {
                    const tokenObject = tokensList.find((x) => x.address === tokenAddress)
                    const countSum = counts.map((x) => Number(x)).reduce((x, y) => x + y).toString()
                    const newCounts = counts.map((x) => Number(x + tokenObject?.zero_const))
                    const allValue = Number(countSum + tokenObject?.zero_const)
                    await senderContract.methods.OtherTokensTransfer(tokenAddress, addresses, newCounts).send({
                        from: account,
                        value: allValue
                    })
                    showNotify({
                        title: "Success",
                        message: "Transaction completed successfully",
                        type: "success",
                    });
                    reset()
                }
                setSenderLoading(false)
            }
        } catch (error) {
            setSenderLoading(false)
            showNotify({
                title: "Error",
                message: "Transaction error",
                type: "danger",
            });
        }
    };


    useEffect(() => {
        setWeb3(null);
        if (windowEthereum) {
            setWeb3(new Web3(windowEthereum));
        }
    }, [windowEthereum]);


    useEffect(() => {
        checkPermission()
    }, [tokenAddress])


    useEffect(() => {
        setSenderContract(null);
        if (web3 && validChain) {
            const contract = makeContract(
                web3,
                SENDER_CONTRACT_ADDRESS,
                JSON.parse(senderAbi.result) as AbiItem[]
            );
            setSenderContract(contract);
        }
    }, [web3, validChain]);

    useEffect(() => {
        reset()
    }, [account])


    return <div className={MainPageStyles.mainBlock}>
        <div className={MainPageStyles.content}>
            <ConnectorHeader account={account} setAccount={setAccount} validChain={validChain}
                             setValidChain={setValidChain}></ConnectorHeader>
            <div className={MainPageStyles.name}>Neon Multisender</div>
            {!account && <div className={MainPageStyles.subTitle}>{'Please connect Metamask'}</div>}
            {account && !validChain && <div className={MainPageStyles.subTitle}>{'Please change chain'}</div>}
            {account && validChain &&
                <div className={MainPageStyles.tokenSelector}>
                    <SelectToken tokenAddress={tokenAddress} setTokenAddress={setTokenAddress}
                                 tokenBalance={tokenBalance}></SelectToken></div>}
            {account && validChain && tokenAddress && !tokenPermission && !checkPermissionLoading &&
                <Button onClick={addPermission} name={'Allow sending token'} loading={permissionLoading}/>}
            {account && validChain && tokenPermission && (tokenBalance > 0) &&
                <Addresses receivers={receivers} setReceivers={setReceivers} web3={web3}></Addresses>}
            {tokenAddress && !permissionLoading && !(tokenBalance > 0) &&
                <div className={MainPageStyles.subTitle}>There are not enough funds in your account</div>}
            {account && validChain && tokenPermission && (receivers.length > 0) && tokenAddress &&
                <Button onClick={multisend} name={'Send tokens'} loading={senderLoading}/>}
        </div>
    </div>

}