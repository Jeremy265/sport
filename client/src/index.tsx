import * as React from "react";
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Router from "./components/Navigation/Router";
import CssBaseline from "@mui/material/CssBaseline";

const container = document.getElementById('root');
const root = createRoot(container!);

const Index = () =>
    <BrowserRouter>
        <CssBaseline/>
        <Header/>
        <Router/>
        <Footer/>
    </BrowserRouter>

root.render(<Index/>);
