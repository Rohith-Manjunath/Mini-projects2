import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-600 h-[4rem]  flex items-center justify-around text-white sticky top-0">
      <h1 className="">
        <span className="text-2xl font-bold text-slate-400">Redux</span>
        <span className="text-2xl font-bold text-slate-200">Store</span>
      </h1>
      <nav className="flex items-center justify-around">
        <ul className="flex items-center justify-around gap-5">
          <li className="font-semibold">
            <Link to="/">Home</Link>
          </li>
          <li className="font-semibold">
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
