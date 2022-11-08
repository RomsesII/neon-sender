import React from "react";
import {AddressesStyles} from "../styles/ButtonStyles";


interface IButtonProps {
    onClick: () => void;
    name: string;
    loading: boolean
}

export const Button = ({onClick, name, loading}: IButtonProps) => {
    return <div className={AddressesStyles.container}
                onClick={loading ? () => {
                } : onClick}>{loading ? 'Loading...' : name}</div>
}