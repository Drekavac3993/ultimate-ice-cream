import React from "react";
import "./styles/ice-cream.scss";
import Header from "./components/structure/Header";
import Footer from "./components/structure/Footer";
import Menu from "./components/ice-cream/Menu";

const App = () => {
  return (
    <>
      <Header />
      <Menu />
      <Footer />
    </>
  );
};

export default App;
