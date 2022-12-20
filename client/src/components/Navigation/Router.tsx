import React = require("react")
import { Route, Routes } from "react-router-dom"
import Error404 from "../Errors/Error404"
import Dashboard from "../Dashboard/Dashboard"
import SignIn from "../SignIn/SignIn"
import SignUp from "../SignUp/SignUp"
import Training from "../Training/Training"

const Router = () =>
    <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/training" element={<Training/>}/>
        <Route path="*" element={<Error404/>}/>
    </Routes>
export default Router
