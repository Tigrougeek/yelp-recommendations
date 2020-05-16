import React, {useEffect, useState} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import NavBar from './NavBar'
import RecommendationPage from './RecommendationPage'
import HomePage from "./HomePage";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from 'react-router-dom';
import "./style.css";
import "leaflet/dist/leaflet.css";

import {
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const history = useHistory();

    const tabs = ['/', '/recommendation'];
    useEffect(
        () => {
        setSelectedTab(Math.max(0, tabs.indexOf(history.location.pathname)));
        console.log(history.location.pathname);

    }, []);

    const handleChange = (e, newValue) => {
        setSelectedTab(newValue);
        switch(newValue) {
            case 1: history.push('/recommendation'); break;
            default: history.push('/'); break;
        }
    };

    return (
        <div>
            <AppBar position="static">
                <div style={{width: 80}}>
                    <img src='panda_marker.png' style={{width: 50, padding: 8, top: -4, left: -2, position: 'fixed', transform: 'scale(1.5)'}}/>
                </div>
                <Tabs value={selectedTab} onChange={handleChange} aria-label="simple tabs example" style={{marginLeft: 60}}>

                    <Tab label="Homepage" />
                    <Tab label="Recommendation" />
                </Tabs>

            </AppBar>

            <Switch>
              <Route path="/recommendation">
                <RecommendationPage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>


            {/*<NavBar city={city} setCity={setCity} user={user} setUser={setUser}/>*/}
        </div>

    )
}
export default App
