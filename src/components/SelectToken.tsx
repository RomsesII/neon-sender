import Select from "./DropDown/Select";
import React from "react";
import {tokensList} from "../constants/tokensList";
import {SelectTokenStyles} from "../styles/SelectTokenStyles";


interface ISelectTokenProps {
    tokenAddress: string;
    setTokenAddress: (value: string) => void;
    tokenBalance: number;

}


export const SelectToken = ({
                                tokenAddress,
                                setTokenAddress,
                                tokenBalance
                            }: ISelectTokenProps) => {


    const tokensOptions = tokensList.map((x) => {
        return {
            text: <div className={SelectTokenStyles.token}>
                <div className={SelectTokenStyles.tokenLogoContainer}>
                    <div><img className={SelectTokenStyles.tokenLogo} src={x.logoURI}/></div>
                </div>
                {x.symbol}</div>,
            value: x.address,
        }
    })

    return <div className={SelectTokenStyles.InfoBlock}>
        <div className={SelectTokenStyles.name}>Choose Token</div>
        <div className={SelectTokenStyles.info}>To continue, select a token from the dropdown list.
            To replenish your balance, use the <a href={'https://neonfaucet.org/'} target={'_blank'}
                                                  className={SelectTokenStyles.faucet} rel="noreferrer">faucet</a></div>
        <Select value={tokenAddress} options={tokensOptions} onChange={setTokenAddress}
                tokenBalance={tokenBalance}></Select>
    </div>
}