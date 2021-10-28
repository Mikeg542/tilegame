import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import App from "./App";
import Battle from "./Battle";
import MapMaker from "./MapMaker";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/battle" exact component={Battle} />
                <Route path="/map" exact component={MapMaker} />
            </Switch>
        </Router>
    );
};
export default Routes;
