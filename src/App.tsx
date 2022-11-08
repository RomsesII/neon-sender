import React from 'react';
import {MetaMaskProvider} from "metamask-react";
import {MainPage} from "./pages/MainPage";
import "./index.css";
import {ReactNotifications} from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


function App() {
    return (
        <>
            <ReactNotifications/>
            <MetaMaskProvider>
                <MainPage></MainPage>
            </MetaMaskProvider>
        </>
    );
}

export default App;
