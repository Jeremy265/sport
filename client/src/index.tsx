import * as React from "react";
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Router from "./components/Navigation/Router";
import CssBaseline from "@mui/material/CssBaseline";
import Title from "./components/Title/Title";

const container = document.getElementById('root');
const root = createRoot(container!);

const Index = () => {

    const getUserName = () => {
        if (!localStorage.getItem('user'))
            return
        const user = JSON.parse(localStorage.getItem('user'))
        return `${user.first_name} ${user.last_name}`
    }


    return (
        <BrowserRouter>
            <CssBaseline/>
            <Header/>
            <Title>{getUserName()}</Title>
            <Router/>
            <Footer/>
        </BrowserRouter>
    )
}

root.render(<Index/>);
