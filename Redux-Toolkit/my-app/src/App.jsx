import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
