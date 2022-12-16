import * as React from "react";
import * as ReactDOM from "react-dom";
import Navigation from "./components/menu/navbar";

const Index = () => {
    return <div><Navigation/></div>;
};
ReactDOM.render(<Index />, document.getElementById("root"));
