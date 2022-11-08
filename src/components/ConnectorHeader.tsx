import React, {useEffect} from 'react';
import {showNotify} from "../utils/showNotify";
import {useMetaMask} from "metamask-react";
import {abbreviateAddress} from "../utils/abbreviateAddress";
import {ConnectorHeaderStyles} from "../styles/ConnectorHeaderStyles";
import neon_logo from "./../assets/images/neon_logo.png"
import {cx} from "@emotion/css";


interface IConnectorHeaderProps {
    account: string;
    setAccount: (value: string) => void
    validChain: boolean;
    setValidChain: (value: boolean) => void;
}

const validChainId = "0xe9ac0ce";

const switchParams = [
    {
        chainId: validChainId,
    },
];

export const ConnectorHeader = ({account, setAccount, validChain, setValidChain}: IConnectorHeaderProps) => {

    const metamask = useMetaMask();

    const checkChain = async () => {
        try {
            await (window as any)?.ethereum?.request({
                method: "wallet_switchEthereumChain",
                params: switchParams,
            });
        } catch {
            showNotify({
                title: "Error",
                message: "Network switch error",
                type: "danger",
            });
        }
    };

    const connect = async () => {
        if ((window as any)?.ethereum && metamask.ethereum !== null) {
            try {
                if (metamask.status === "notConnected") {
                    await metamask.connect();
                }
            } catch {
                showNotify({
                    title: "Error",
                    message: "Metamask connection error",
                    type: "danger",
                });
            }
        } else {
            showNotify({
                title: "Warning",
                message: "Please install Metamask for desktop",
                type: "warning",
            });
        }
    };

    useEffect(() => {
        setAccount("");
        if (metamask.status === "connected" && metamask.account) {
            setAccount(metamask.account);
        }
    }, [metamask?.status, metamask?.account]);

    useEffect(() => {
        if (account) {
            if (metamask?.chainId === validChainId) {
                setValidChain(true);
            } else {
                setValidChain(false);
            }
        }
    }, [metamask?.chainId, account]);


    return <div className={ConnectorHeaderStyles.connectorBlock}>
        <div className={ConnectorHeaderStyles.contentBlock}>
            <div className={ConnectorHeaderStyles.logoContainer}>
                <img className={ConnectorHeaderStyles.neonLogo} src={neon_logo}/>
            </div>
            <div
                className={cx(ConnectorHeaderStyles.connect, (account && validChain && ConnectorHeaderStyles.address))}>
                {!account && (
                    <div className={ConnectorHeaderStyles.container} onClick={connect}>
                        CONNECT WALLET
                    </div>
                )}
                {account && validChain && (
                    <div>
                        {abbreviateAddress(account, 5)}
                    </div>
                )}
                {account && !validChain && (
                    <div onClick={checkChain} className={ConnectorHeaderStyles.container}>
                        CHANGE CHAIN
                    </div>
                )}
            </div>
        </div>
    </div>

}