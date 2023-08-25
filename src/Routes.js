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
                <Route path="/app" exact component={App} />
                <Route path="/" exact component={Battle} />
                <Route path="/map" exact component={MapMaker} />
            </Switch>
        </Router>
    );
};
export default Routes;
