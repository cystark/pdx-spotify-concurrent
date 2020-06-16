import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Music from "./Pages/Music";
import Home from "./Pages/Home";

const App = () => (
  <>
    <Nav />
    <hr />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/music">
        <Music />
      </Route>
    </Switch>
  </>
);

export default App;
