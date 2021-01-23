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
import IceCreams from "./components/ice-cream/IceCreams";
import EditIceCream from "./components/ice-cream/EditIceCream";
import AddIceCream from "./components/ice-cream/AddIceCream";
import "./styles/ice-cream.scss";

const App = () => {
  return (
    <Router>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <Switch>
        <Route path="/" exact component={Menu} />
        <Route path="/ice-creams/" exact component={IceCreams} />
        <Route path="/menu-items/add" exact component={AddIceCream} />
        <Route path="/menu-items/:menuItemId" exact component={EditIceCream} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
