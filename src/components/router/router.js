import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";

import App from "../app";
import Recipe from "../recipe";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/recipe/:id" component={Recipe}/>
        </Switch>
    </BrowserRouter>
);

export default Router;