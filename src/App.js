import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "./components/structure/Header";
import Footer from "./components/structure/Footer";
import Menu from "./components/ice-cream/Menu";
import EditIceCream from "./components/ice-cream/EditIceCream";
import "./styles/ice-cream.scss";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Menu} />
        <Route path="/menu-items/:menuItemId" exact component={EditIceCream} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
