import * as React from "react";
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Router from "./components/Navigation/Router";
import CssBaseline from "@mui/material/CssBaseline";

const container = document.getElementById('root');
const root = createRoot(container!);

const Index = () => {
    // const token = JSON.parse(localStorage.getItem('user'))?.token
    //
    // if (token) {
    //     const decodedToken: {exp: number} = jwt_decode(token);
    //     if (decodedToken.exp < new Date().getTime()) {
    //         localStorage.removeItem('user')
    //         window.location.href = '/signin'
    //     }
    // }

    return (
        <BrowserRouter>
            <CssBaseline/>
            <Header/>
            <Router/>
            <Footer/>
        </BrowserRouter>
    )
}

root.render(<Index/>);
