import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

// import Activate from "./paths/activate";
import Signin from "./signin";
import home from "./home";
import Signup from "./signup";
import ResetPassword from "./resetPassword";
import forgotPassword from "./forgotPassword";


function Router() {
    return <BrowserRouter>

            <Switch>
                <Route    component={home} exact path="/" />
                <Route component={Signin} exact path="/signin" />
                <Route component={Signup} exact path="/signup"/>
                {/* <Route component={Activate} exact path="/auth/activate/:token" /> */}
                <Route component={ResetPassword} exact path="/auth/reset-password/:token" />
                <Route component={forgotPassword} exact path="/forgot-password"/>
            </Switch>
    </BrowserRouter>
}

export default Router;