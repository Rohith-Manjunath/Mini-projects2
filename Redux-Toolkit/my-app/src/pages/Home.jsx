import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Slice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart); // Update this line
  const dispatch = useDispatch();
  console.log(cart);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    let data = await fetch("https://fakestoreapi.com/products");
    data = await data.json();
    setProducts(data);
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + " ...";
    }
    return description;
  };

  const Cart = (id) => {
    dispatch(addToCart(id));
  };

  return (
    <main className="w-[90%] p-5  mx-auto mt-[2rem] flex flex-wrap gap-5 items-start justify-center">
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className="w-[15rem] h-auto p-4 border border-grey rounded-md flex flex-col items-start justify-between gap-2"
          >
            <img src={product.image} alt="" className="w-full h-[14rem] " />
            <h2 className="text-xl font-semibold text-slate-700">
              {product.title}
            </h2>
            <h3 className="font-bold text-red-500">Price - {product.price}$</h3>
            <p className="text-slate-600">
              {truncateDescription(product.description, 150)}
            </p>
            <span className="text-green-500 font-semibold">
              In Stock - {product.rating.count}
            </span>
            <h4 className="text-blue-500"> Rating - {product.rating.rate}</h4>
            <button
              className="bg-purple-600 text-white font-bold w-[70%] p-2 rounded-md shadow-lg active:translate-x-1 active:translate-y-1 transition-all duration-200"
              onClick={() => Cart(product)}
            >
              Add to cart
            </button>
          </div>
        );
      })}
    </main>
  );
};

export default Home;
