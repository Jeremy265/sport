import React = require("react")
import {Route, Routes} from "react-router-dom"
import Error401 from "../Errors/Error401"
import Error404 from "../Errors/Error404"
import Dashboard from "../Dashboard/Dashboard"
import SignIn from "../SignIn/SignIn"
import SignUp from "../SignUp/SignUp"
import Training from "../Training/Training"
import {useEffect, useState} from "react";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={
                localStorage.getItem('user')
                    ? <Dashboard/>
                    : <SignIn/>
            }/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/training" element={
                localStorage.getItem('user')
                    ? <Training/>
                    : <Error401/>
            }/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
    )
}

export default Router
