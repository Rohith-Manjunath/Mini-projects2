import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const cart = useSelector((state) => state.cart).length;

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
            <Link to="/cart" className="relative">
              Cart
              <span className="absolute top-[-0.5rem] right-[-1rem] bg-red-600 text-white px-1 rounded-3xl">
                {cart}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
